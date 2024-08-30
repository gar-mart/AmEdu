CREATE PROCEDURE Student.ReturnAppTileMetadata
AS
SET NOCOUNT ON 
SELECT 
	AlwaysShow
	, Title
	, a.DefaultOrderBy
	, a.Id
	, a.Image
	, a.Url	
	, a.IsDefault
FROM Student.AppTileMetadata a
ORDER BY Title

SELECT 
	a.AppTileMetadataId
	, a.GradeLevel
FROM Student.AppTileGradeLevel a
GO
