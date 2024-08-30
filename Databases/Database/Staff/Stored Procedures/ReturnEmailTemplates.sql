CREATE PROCEDURE Staff.ReturnEmailTemplates (
	@currentUserId INT
)
AS
SET NOCOUNT ON

SELECT 
	Html
	, Id
	, Name
	, UserId
FROM Staff.EmailTemplates
WHERE UserId = @currentUserId