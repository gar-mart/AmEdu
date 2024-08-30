CREATE PROCEDURE Student.ReturnStudentResourcesBySearch
	@searchTerm NVARCHAR(30)
AS
SET NOCOUNT ON 

SET @searchTerm = '%' + REPLACE(COALESCE(@searchTerm, ''), ' ', '') + '%'

SELECT 
	a.Id
	, a.Title
	, a.Category
	, a.Url
	, a.ShowOnStudentDashboard
FROM Student.StudentResources a 
WHERE a.Title LIKE @searchTerm