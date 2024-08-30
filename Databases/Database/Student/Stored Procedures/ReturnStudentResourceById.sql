CREATE PROCEDURE Student.ReturnStudentResourceById
	@id INT
AS
SET NOCOUNT ON

SELECT 
	a.Id
	, a.Title
	, a.Category
	, a.Url
	, a.ShowOnStudentDashboard
FROM Student.StudentResources a
WHERE a.Id = @id