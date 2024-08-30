CREATE PROCEDURE Student.UpdateStudentResource
	@id INT
	, @title NVARCHAR(50)
	, @category NVARCHAR(50)
	, @url NVARCHAR(MAX)
	, @showOnStudentDashboard BIT
AS
SET NOCOUNT ON

UPDATE Student.StudentResources
SET 
	Title = @title
	, Category = @category
	, Url = @url
	, ShowOnStudentDashboard = @showOnStudentDashboard
WHERE 
	Id = @id