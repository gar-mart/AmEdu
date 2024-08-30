CREATE PROCEDURE Student.ReturnAppTileMetadataById (
	@id INT
)
AS
SET NOCOUNT ON 

SELECT 
	a.Id
	, a.Title
	, a.Image
	, a.Url	
	, a.DefaultOrderBy
	, a.AlwaysShow
	, a.IsDefault
FROM Student.AppTileMetadata a
WHERE a.Id = @id