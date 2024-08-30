CREATE PROCEDURE Attendance.CreateCommunication (
	@userId INT  --student Id
	, @staffId INT
	, @date DATETIME2(0)
	, @type TINYINT
	, @notes NVARCHAR(MAX)
	, @wasSuccessful BIT
	, @awardPoint BIT
	, @pageSource TINYINT = 1 -- right now the source is always the students page
	, @newId INT OUTPUT
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION
	
		-- Insert communication record
		INSERT INTO Attendance.Communications (UserId, StaffId, Date, Type, Notes, WasSuccessful, AwardPoint)
		VALUES (@userId, @staffId, @date, @type, @notes, @wasSuccessful, @awardPoint)
		SET @newId = SCOPE_IdENTITY()

		-- Insert communication point record
		IF @awardPoint = 1			
			WITH TeacherClasses AS (
				SELECT teacherEnrollment.ClassId
				FROM Attendance.vwClassUsers teacherEnrollment
				WHERE teacherEnrollment.UserId = @staffId
					AND Common.CurrentEasternTime() BETWEEN teacherEnrollment.StartDate AND teacherEnrollment.EndDate
					AND teacherEnrollment.IsDeleted = 0
			), StudentTeacherClasses AS (
				SELECT studentEnrollment.ClassId
				FROM Attendance.vwClassUsers studentEnrollment
				WHERE studentEnrollment.UserId = @userId
					AND Common.CurrentEasternTime() BETWEEN studentEnrollment.StartDate AND studentEnrollment.EndDate
					AND studentEnrollment.IsDeleted = 0
					AND studentEnrollment.ClassId IN (
						SELECT teacherEnrollment.ClassId
						FROM TeacherClasses teacherEnrollment
					)
			)
			INSERT INTO Attendance.Points (UserId, StaffId, Date, Type, Value, CreatedDate, CommunicationId, PageSource, UserSource, MentorId, GradeLevel)
			SELECT 
				@userId
				, @staffId
				, @date
				, 1
				, 1
				, SYSUTCDATETIME()
				, @newId
				, @pageSource
				-- NULL = unknown, 1 = Mentor, 2 = Teacher, 4 = Other (in case we are allowed to have overlap, 3 would be Mentor and Teacher)
				, ISNULL(
					NULLIF(
						IIF(student.MentorId = @staffId, 1, 0) + IIF(EXISTS (SELECT * FROM StudentTeacherClasses), 2, 0)
					, 0)
				, 4)
				, student.MentorId
				, student.GradeLevel
			FROM Common.Users student 
			WHERE student.Id = @userId

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH