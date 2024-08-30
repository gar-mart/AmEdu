CREATE PROCEDURE Student.ReturnAppTileGradeLevelsByMetadataId (
	@metadataId INT
)
AS 
SET NOCOUNT ON 

SELECT 
	GradeLevel
FROM AppTileGradeLevel 
WHERE AppTileMetadataId = @metadataId
