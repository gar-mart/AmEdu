CREATE PROCEDURE Orientation.CompleteStep(
	@userId INT
	, @stepId INT
)
AS
SET NOCOUNT ON

DECLARE @allStepsFinished BIT

MERGE Orientation.CompletedSteps TRG
USING (SELECT @userId UserId, @stepId StepId) SRC on TRG.UserId = SRC.UserId AND TRG.StepId = SRC.StepId
WHEN NOT MATCHED THEN INSERT(UserId, StepId) VALUES(@userId, @stepId);

SET @allStepsFinished = (
	SELECT IIF(d.TotalSteps = f.CompletedSteps, 1, 0)
	FROM Common.Users a
	CROSS APPLY(
		SELECT COUNT(*) TotalSteps 
		FROM Orientation.vwStudentSteps c 
		WHERE c.UserId = a.Id
			AND c.IsActive = 1
	) d
	CROSS APPLY(
		SELECT COUNT(*) CompletedSteps 
		FROM Orientation.CompletedSteps e 
		INNER JOIN Orientation.StepGradeLevel g ON g.GradeLevel = a.GradeLevel AND e.StepId = g.StepId
		INNER JOIN Orientation.Steps i ON e.StepId = i.Id AND i.IsActive = 1
		WHERE e.UserId = a.Id
	) f
	WHERE a.Id = @userId
)

IF @allStepsFinished = 1 BEGIN
	UPDATE Common.Users
	SET OrientationFinishTime = SYSDATETIME()
	WHERE Id = @userId
END

SELECT TOP 1
	s.Id
	, s.Name
	, s.ContentFileName
	, IIF(cs.StepId IS NULL, 0, 1) IsCompleted
FROM Orientation.Steps s
INNER JOIN Orientation.StepGradeLevel sgl on s.Id = sgl.StepId
INNER JOIN Common.Users u on sgl.GradeLevel = u.GradeLevel AND u.Id = @userId
LEFT JOIN Orientation.CompletedSteps cs on s.Id = cs.StepId AND cs.UserId = @userId
WHERE 
	cs.StepId IS NULL
	AND s.IsActive = 1
ORDER BY s.OrderBy