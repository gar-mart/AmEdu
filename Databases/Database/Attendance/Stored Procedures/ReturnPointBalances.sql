CREATE PROCEDURE Attendance.ReturnPointBalances(
	@gradeLevels Tvp.GradeLevelList READONLY
)
AS
SET NOCOUNT ON

DECLARE @GradeLevelCount INT
SET @GradeLevelCount = (SELECT COUNT(*) FROM @gradeLevels)

BEGIN
	SELECT
		u.Id StudentId
		, u.FirstName
		, u.LastName
		, SUM(a.Value) PointBalance
	FROM Attendance.vwCurrentPoints a
	INNER JOIN Common.Users u ON a.UserId = u.Id
	AND (@GradeLevelCount = 0 OR EXISTS (SELECT 1 FROM @gradeLevels b WHERE u.GradeLevel = b.GradeLevel))
	AND u.IsActive = 1
	WHERE u.Email LIKE '%AmEdustudents%'
	GROUP BY u.Id, u.LastName, u.FirstName
	ORDER BY LastName, FirstName
END