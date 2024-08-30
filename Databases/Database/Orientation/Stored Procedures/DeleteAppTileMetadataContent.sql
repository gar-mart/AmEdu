CREATE PROCEDURE Orientation.DeleteAppTileMetadataContent (
	@id INT
)
AS
SET NOCOUNT ON 

DELETE FROM Orientation.AppTileMetadataContent 
WHERE Id = @id
