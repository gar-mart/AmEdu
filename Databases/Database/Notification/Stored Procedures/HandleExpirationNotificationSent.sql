CREATE PROCEDURE [Notification].[HandleExpirationNotificationSent](
	@userId INT
)
AS
SET NOCOUNT ON

UPDATE Common.Users
SET OrientationExpiredNotificationSent = 1
WHERE Id = @userId