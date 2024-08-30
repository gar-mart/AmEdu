CREATE VIEW Orientation.vwStudentSteps
AS 
SELECT 
	Steps.ActivateDate
	, Steps.ExpirationDate
	, Steps.ContentFileName
	, Steps.Id StepId
	, Steps.IsActive
	, Steps.Name
	, Steps.OrderBy
	, Users.Id UserId
FROM Common.Users 
INNER JOIN Orientation.StepGradeLevel ON Users.GradeLevel = StepGradeLevel.GradeLevel 
INNER JOIN Orientation.Steps ON StepGradeLevel.StepId = Steps.Id