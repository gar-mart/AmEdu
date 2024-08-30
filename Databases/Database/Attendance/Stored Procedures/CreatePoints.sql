CREATE PROCEDURE Attendance.CreatePoints (
	@userId INT  --student
	, @staffId INT
	, @type TINYINT
	, @value SMALLINT
	, @currentDateTime DATETIME2(7)
	, @date DATETIME2(0)  --date the points apply to, not necessarily the same as the date created
	, @comments NVARCHAR(500)	
	, @pageSource TINYINT NULL -- NULL = unknown, 1 = Students Page, 2 = Live Lessons Page
)
AS
SET NOCOUNT ON

;WITH TeacherClasses AS (
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
INSERT INTO Attendance.Points (UserId, StaffId, Date, Type, Value, CreatedDate, Comments, PageSource, UserSource, MentorId, GradeLevel)
SELECT 
	@userId
	, @staffId
	, @date
	, @type
	, @value
	, @currentDateTime
	, @comments
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

