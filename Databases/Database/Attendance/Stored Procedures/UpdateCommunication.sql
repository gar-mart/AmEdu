CREATE PROCEDURE Attendance.UpdateCommunication (
	@id INT
	, @date DATETIME2(0)
	, @type TINYINT
	, @notes NVARCHAR(MAX)
	, @wasSuccessful BIT
	, @awardPoint BIT
	, @pageSource TINYINT = 1 -- right now, the source of this is always the students page
)
AS
SET NOCOUNT ON

DECLARE @hasChanged BIT = 0
	, @staffId INT
	, @userId INT

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

		UPDATE Attendance.Communications SET
			Date = @date
			, Type = @type
			, Notes = @notes
			, WasSuccessful = @wasSuccessful
			, AwardPoint = @awardPoint
			, @hasChanged = IIF(@awardPoint = AwardPoint, 0, 1)
			, @userId = UserId
			, @staffId = StaffId
		WHERE Id = @id

		IF @hasChanged = 1
			IF @awardPoint = 0
				DELETE Attendance.Points
				WHERE CommunicationId = @id
			ELSE
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
				INSERT INTO Attendance.Points (CommunicationId, CreatedDate, Date, StaffId, Type, UserId, Value, PageSource, UserSource, MentorId, GradeLevel)
				SELECT
					@id
					, SYSUTCDATETIME()
					, @date
					, @staffId
					, 1 -- communication type
					, @userId
					, 1
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