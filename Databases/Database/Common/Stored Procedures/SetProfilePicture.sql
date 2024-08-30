CREATE PROCEDURE Common.SetProfilePicture(
	@userId INT
	, @profilePicture VARCHAR(MAX)
)
AS
SET NOCOUNT ON

UPDATE Common.Users
SET ProfilePicture = @profilePicture
WHERE Id = @userId

