CREATE PROCEDURE Common.DeleteBreak (
	@id INT
)
AS
SET NOCOUNT ON

DELETE Common.Breaks
WHERE Id = @id
