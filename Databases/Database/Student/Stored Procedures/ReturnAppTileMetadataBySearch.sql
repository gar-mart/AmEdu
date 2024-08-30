CREATE PROCEDURE Student.ReturnAppTileMetadataBySearch (
	@searchTerm NVARCHAR(30)
)
AS
SET NOCOUNT ON 

SET @searchTerm = '%' + REPLACE(COALESCE(@searchTerm, ''), ' ', '') + '%'

SELECT 
	a.AlwaysShow
	, a.Title
	, a.DefaultOrderBy
	, a.Id
	, a.Image
	, a.Url	
	, a.IsDefault
FROM Student.AppTileMetadata a
WHERE a.Title LIKE @searchTerm
ORDER BY a.Title
