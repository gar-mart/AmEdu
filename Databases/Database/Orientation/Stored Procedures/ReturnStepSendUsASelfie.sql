CREATE PROCEDURE Orientation.ReturnStepSendUsASelfie(
	@userId INT
)
AS
SET NOCOUNT ON

SELECT Picture
FROM Orientation.Step_SendUsASelfie
WHERE UserId = @userId

