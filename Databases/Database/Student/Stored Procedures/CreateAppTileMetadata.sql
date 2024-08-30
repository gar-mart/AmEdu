CREATE PROCEDURE Student.CreateAppTileMetadata
	@title NVARCHAR(50)
	, @url NVARCHAR(250)
	, @alwaysShow BIT
	, @isDefault BIT
	, @gradeLevels Tvp.GradeLevelList READONLY
	, @newId INT OUTPUT
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	INSERT INTO Student.AppTileMetadata (Title, Url, DefaultOrderBy, AlwaysShow, IsDefault)
	VALUES (@title, @url, 0, @alwaysShow, @isDefault)

	SET @newId = SCOPE_IDENTITY()

	INSERT INTO Student.AppTileGradeLevel (AppTileMetadataId, GradeLevel)
	SELECT @newId, a.GradeLevel
	FROM @gradeLevels a

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH