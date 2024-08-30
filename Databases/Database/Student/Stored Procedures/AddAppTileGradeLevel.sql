CREATE PROCEDURE Student.AddAppTileGradeLevel
	@metadataId INT
	, @gradeLevel NVARCHAR(10)
	, @newId INT OUTPUT
AS
SET NOCOUNT ON

INSERT INTO Student.AppTileGradeLevel (AppTileMetadataId, GradeLevel)
VALUES (@metadataId, @gradeLevel)