CREATE PROCEDURE Student.DeleteAppTileGradeLevelsByMetadataId
	@metadataId INT
AS
SET NOCOUNT ON 
	
DELETE FROM Student.AppTileGradeLevel 
WHERE AppTileMetadataId = @metadataId
