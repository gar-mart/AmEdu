CREATE PROCEDURE Orientation.Step_SendUsASelfie_Submit(
	@userId INT
	, @picture VARCHAR(MAX)
)
AS
SET NOCOUNT ON

MERGE Orientation.Step_SendUsASelfie TRG
USING (SELECT @userId UserId) SRC ON TRG.UserId = SRC.UserId
WHEN MATCHED THEN UPDATE SET Picture = @picture
WHEN NOT MATCHED THEN INSERT(UserId, Picture)
VALUES(@userId, @picture);

