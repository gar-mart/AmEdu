CREATE PROCEDURE Orientation.ReturnUserElectives (
	@userId INT
	, @semester INT
	, @schoolYear INT
)
AS
SET NOCOUNT ON

DECLARE @ConsiderAsNextGradeLevel BIT = CASE
	WHEN MONTH(SYSUTCDATETIME()) BETWEEN 1 AND 6 AND @schoolYear = YEAR(SYSUTCDATETIME()) THEN 1
	ELSE 0
END

DECLARE @GradeLevel NVARCHAR(2) = (
	SELECT IIF(@ConsiderAsNextGradeLevel = 1
		, CAST(ISNULL(TRY_CAST(Users.GradeLevel AS INT), 0) + 1 AS NVARCHAR(2))
		, Users.GradeLevel)
	FROM Common.Users
	WHERE Id = @userId
)

SELECT
	a.Semester
	, a.ElectiveId
	, b.Name
	, b.IsCommunityPassportElective
	, b.IsCommunityPassportElectiveAlternate
	, b.HasPrerequisite
	, CAST(IIF(d.ElectiveId IS NULL, 0, 1) AS BIT) IsSelected 
	, GradeLevel = @GradeLevel
	, ISNULL(d.IsLockedIn, 0) IsLockedIn
FROM Orientation.SemesterElectives a
INNER JOIN Orientation.Electives b ON a.ElectiveId = b.Id
LEFT JOIN Orientation.Step_UserElectives d ON a.GradeLevel = d.GradeLevel AND a.Semester = d.Semester AND a.ElectiveId = d.ElectiveId AND d.UserId = @userId
WHERE 
	a.GradeLevel = @GradeLevel
	AND a.Semester = @semester
ORDER BY b.Name