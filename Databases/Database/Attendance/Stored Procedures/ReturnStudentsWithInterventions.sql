CREATE PROCEDURE Attendance.ReturnStudentsWithInterventions (
	@includeStudentId INT
)
AS
SET NOCOUNT ON

SELECT 
	u.Id
	, u.Name
	, u.GradeLevel
FROM Common.Users u
WHERE u.Id = @includeStudentId
	OR EXISTS (
		SELECT * 
		FROM Attendance.Interventions i
		INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
		WHERE ef.UserId = u.Id
	) 
ORDER BY u.Name