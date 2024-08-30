CREATE PROCEDURE Student.UpdateAppTileMetadata (
	@id INT 
	, @title NVARCHAR(50) = NULL
	, @url NVARCHAR(250) = NULL
	, @alwaysShow BIT = NULL
	, @isDefault BIT = NULL
	, @image NVARCHAR(100) = NULL -- if provided, only update the Image
	, @gradeLevels Tvp.GradeLevelList READONLY
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	IF @image IS NOT NULL
		UPDATE Student.AppTileMetadata SET
			Image = @image
		WHERE Id = @id
	ELSE
	BEGIN
		UPDATE Student.AppTileMetadata
		SET 
			Title = @title
			, Url = @url
			, AlwaysShow = @alwaysShow
			, IsDefault = @isDefault
		WHERE 
			Id = @id

		; WITH AppTile AS (
			SELECT * 
			FROM Student.AppTileGradeLevel 
			WHERE AppTileMetadataId = @id
		)
		MERGE AppTile USING @gradeLevels GradeLevels 
			ON AppTile.GradeLevel = GradeLevels.GradeLevel
		WHEN NOT MATCHED THEN
			INSERT (AppTileMetadataId, GradeLevel)
			VALUES (@id, GradeLevels.GradeLevel)
		WHEN NOT MATCHED BY SOURCE THEN
			DELETE;
	END

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH