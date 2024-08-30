-- Summary:
--   Deletes an email template as long as the current user owns it.
CREATE PROCEDURE Staff.DeleteEmailTemplate (
	@currentUserId INT
	, @id INT
)
AS
SET NOCOUNT ON

DELETE Staff.EmailTemplates
WHERE UserId = @currentUserId
	AND Id = @id
