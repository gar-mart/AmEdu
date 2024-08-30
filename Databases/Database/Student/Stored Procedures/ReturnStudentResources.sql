CREATE PROCEDURE Student.ReturnStudentResources
AS	
SET NOCOUNT ON 

SELECT 
	a.Id
	, a.Title
	, a.Category
	, a.Url
	, a.ShowOnStudentDashboard
FROM Student.StudentResources a
ORDER BY Category, Title

SELECT 
	a.StudentResourceId
	, a.GradeLevel
FROM Student.StudentResourceGradeLevel a
GO
