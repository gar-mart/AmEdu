CREATE PROCEDURE Student.ReturnAppTiles (
	@currentUserId INT
)
AS
SET NOCOUNT ON

DECLARE @GradeLevel NVARCHAR(10) = (
	SELECT GradeLevel
	FROM Common.Users 
	WHERE Id = @currentUserId
)

-- Always make sure the student is up-to-date with their app tiles
; WITH AppTileMetadata AS (
	SELECT 
		Id
		, Title
		, Image
		, Url
		, DefaultOrderBy
		, AlwaysShow 
		, IsDefault
	FROM Student.AppTileMetadata a
	INNER JOIN Student.AppTileGradeLevel b ON a.Id = b.AppTileMetadataId
	WHERE b.GradeLevel = @GradeLevel
), StudentAppTiles AS (
	SELECT
		Id
		, MetadataId
		, UserId
		, Show
		, OrderBy
	FROM Student.AppTiles
	WHERE UserId = @currentUserId
)
MERGE StudentAppTiles USING AppTileMetadata ON StudentAppTiles.MetadataId = AppTileMetadata.Id
WHEN NOT MATCHED THEN INSERT (
	MetadataId
	, UserId
	, Show
	, OrderBy
) VALUES (
	AppTileMetadata.Id
	, @currentUserId
	, AppTileMetadata.IsDefault
	, (SELECT ISNULL(MAX(OrderBy), 0) FROM StudentAppTiles) + AppTileMetadata.DefaultOrderBy
)
WHEN MATCHED THEN UPDATE SET 
	Show = CASE 
		WHEN AppTileMetadata.AlwaysShow = 1 THEN 1
		ELSE Show
	END
WHEN NOT MATCHED BY SOURCE THEN DELETE;

SELECT 
	a.Id
	, a.MetadataId
	, a.OrderBy
	, a.Show
	, a.UserId
FROM Student.AppTiles a
WHERE a.UserId = @currentUserId
ORDER BY a.OrderBy

SELECT 
	AlwaysShow
	, Title
	, a.DefaultOrderBy
	, a.Id
	, a.Image
	, a.Url	
FROM Student.AppTileMetadata a

SELECT 
	a.AppTileMetadataId
	, a.GradeLevel
FROM Student.AppTileGradeLevel a
