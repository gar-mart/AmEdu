CREATE PROCEDURE Orientation.CreateElectiveGroupChoice (
	@electiveId INT
	, @electiveGroupId INT
	, @newId INT OUTPUT
)
AS
SET NOCOUNT ON

INSERT INTO Orientation.ElectiveGroupChoices (ElectiveId, ElectiveGroupId)
VALUES (@electiveId, @electiveGroupId)

SET @newId = SCOPE_IDENTITY();