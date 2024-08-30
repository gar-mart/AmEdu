CREATE PROCEDURE Student.DeleteStudentResourceContent (
	@id INT
)
AS
SET NOCOUNT ON

DELETE FROM Student.StudentResources
WHERE Id = @id