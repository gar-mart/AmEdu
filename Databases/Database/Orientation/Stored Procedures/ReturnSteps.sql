CREATE PROCEDURE Orientation.ReturnSteps
AS
SET NOCOUNT ON

-- Steps
SELECT 
	Steps.ActivateDate
	, Steps.ContentFileName
	, Steps.ExpirationDate
	, Steps.Id
	, Steps.IsActive
	, Steps.Name
	, Steps.OrderBy
FROM Orientation.Steps
ORDER BY Steps.OrderBy

SELECT 
	StepGradeLevel.GradeLevel
	, StepGradeLevel.StepId
FROM Orientation.StepGradeLevel