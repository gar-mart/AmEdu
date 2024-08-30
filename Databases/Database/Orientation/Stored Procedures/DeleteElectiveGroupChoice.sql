CREATE PROCEDURE Orientation.DeleteElectiveGroupChoice
	@id INT
AS
SET NOCOUNT ON 

DELETE FROM Orientation.ElectiveGroupChoices WHERE Id = @id