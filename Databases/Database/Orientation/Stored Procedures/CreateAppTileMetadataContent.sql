CREATE PROCEDURE Orientation.CreateAppTileMetadataContent
	@stepId INT
	, @orderBy INT
	, @appTileMetadataId INT
AS
SET NOCOUNT ON

INSERT INTO Orientation.AppTileMetadataContent (StepId, OrderBy, AppTileMetadataId)
VALUES (@stepId, @orderBy, @appTileMetadataId)