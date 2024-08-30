CREATE PROCEDURE Attendance.ReturnEngagementFlagReport (
	@schoolYear Common.SchoolYear = NULL
	, @enrollmentStatus BIT = NULL
)
AS
SET NOCOUNT ON

SELECT
	student.Name StudentName
	, student.Id StudentId
	, student.Email StudentEmail
	, student.GradeLevel
	, mentor.Name MentorName
	, ef.WeekOfDate
FROM Common.Users student
INNER JOIN Common.Users mentor ON student.MentorId = mentor.Id
INNER JOIN Attendance.EngagementFlags ef ON student.Id = ef.UserId
WHERE ef.ApprovedStatus IS NULL	
	AND (
		@schoolYear IS NULL 
		OR YEAR(ef.WeekOfDate) - IIF(MONTH(ef.WeekOfDate) >= 7, 0, 1) = @schoolYear
	)
	AND (
		@enrollmentStatus IS NULL
		OR @enrollmentStatus = 1 AND student.IsActive = 1 AND (
			student.UnenrollmentDate IS NULL
			OR student.UnenrollmentDate > SYSUTCDATETIME()
		)
		OR @enrollmentStatus = 0 AND (
			student.UnenrollmentDate <= SYSUTCDATETIME()
			OR student.IsActive = 0
		)
	)

	