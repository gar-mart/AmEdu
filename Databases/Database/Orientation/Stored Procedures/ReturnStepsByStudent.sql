CREATE PROCEDURE Orientation.ReturnStepsByStudent(
	@userId INT
	, @date DATE
)
AS
SET NOCOUNT ON


;WITH CTE AS (
	SELECT
		a.StepId Id
		, a.Name
		, a.ContentFileName
		, IIF(d.StepId IS NULL, 0, 1) IsCompleted
		, a.OrderBy
		, a.UserId
		, d.CompletedDate
	FROM Orientation.vwStudentSteps a
	LEFT JOIN Orientation.CompletedSteps d ON a.StepId = d.StepId AND a.UserId = d.UserId
	WHERE a.UserId = @userId
		AND @date BETWEEN CAST(ActivateDate AS DATE) AND ISNULL(ExpirationDate, @date)
)
, cteRank AS (
	SELECT
		Id
		, Name
		, ContentFileName
		, IsCompleted
		, OrderBy
		, UserId
		, CompletedDate
		, ROW_NUMBER() OVER(ORDER BY IsCompleted, OrderBy) Rn
	FROM CTE
)
SELECT
	Id
	, Name
	, ContentFileName
	, IsCompleted
	, IIF(IsCompleted = 0 AND Rn = 1, 1, 0) IsCurrent
	, UserId
	, CompletedDate
FROM cteRank
ORDER BY OrderBy

;WITH CTE AS (
	SELECT a.StepId, IIF(d.StepId IS NULL, 0, 1) IsCompleted
	FROM Orientation.vwStudentSteps a
	LEFT JOIN Orientation.CompletedSteps d ON a.StepId = d.StepId AND a.UserId = d.UserId
	WHERE a.UserId = @userId		
		AND @date BETWEEN CAST(ActivateDate AS DATE) AND ISNULL(ExpirationDate, @date)
)
SELECT 
	COUNT(*) TotalSteps
	, SUM(IsCompleted) CompletedSteps
	, (
		SELECT GradeLevel
		FROM Common.Users
		WHERE Id = @userId
	) GradeLevel
FROM CTE
