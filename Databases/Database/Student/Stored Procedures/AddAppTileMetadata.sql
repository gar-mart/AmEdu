CREATE PROCEDURE Student.AddAppTileMetadata
	@title NVARCHAR(50)
	, @url NVARCHAR(250)
	, @defaultOrderBy INT
	, @alwaysShow BIT
	, @isDefault BIT
	, @newId INT OUTPUT
AS
SET NOCOUNT ON

INSERT INTO Student.AppTileMetadata (Title, Url, DefaultOrderBy, AlwaysShow, IsDefault)
VALUES (@title, @url, @defaultOrderBy, @alwaysShow, @isDefault)

SET @newId = SCOPE_IDENTITY()