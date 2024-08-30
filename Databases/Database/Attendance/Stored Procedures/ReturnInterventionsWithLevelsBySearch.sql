CREATE PROCEDURE Attendance.ReturnInterventionsWithLevelsBySearch (
	@schoolYear Common.SchoolYear
	, @enrollmentStatus BIT = NULL
)
AS
SET NOCOUNT ON

;WITH StudentInterventions AS(
	SELECT 
		ef.UserId StudentId
		, student.Name Student
		, student.GradeLevel 
		, mentor.Name Mentor
		, i.Level
		, i.Status
		, EmailExists = IIF(iec.Email IS NULL, 0, 1)
		, i.GeneratedDate
	FROM Attendance.Interventions i
	INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
	INNER JOIN Common.Users student ON ef.UserId = student.Id
	LEFT JOIN Common.Users mentor ON student.MentorId = mentor.Id
	LEFT JOIN Attendance.InterventionEmailCommunications iec ON iec.InterventionId = i.Id
	WHERE
		i.SchoolYear = @schoolYear
		AND i.LogOnly = 0
		AND i.Level > 0
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
	)

SELECT 
	StudentId
	, Student
	, GradeLevel
	, Mentor
	, MAX(CASE WHEN Level = 1 THEN Status END) AS Level1
	, MAX(CASE WHEN Level = 2 THEN Status END) AS Level2
	, MAX(CASE WHEN Level = 3 THEN Status END) AS Level3
	, MAX(CASE WHEN Level = 4 THEN Status END) AS Level4
	, MAX(CASE WHEN Level = 1 THEN EmailExists END) AS Level1EmailExists
	, MAX(CASE WHEN Level = 2 THEN EmailExists END) AS Level2EmailExists
	, MAX(CASE WHEN Level = 3 THEN EmailExists END) AS Level3EmailExists
	, MAX(CASE WHEN Level = 4 THEN EmailExists END) AS Level4EmailExists
FROM StudentInterventions
GROUP BY StudentId, Student, GradeLevel, Mentor
ORDER BY MAX(GeneratedDate) DESC

