-- Summary: 
--   Upserts an email template for the current user.
CREATE PROCEDURE Staff.CreateEmailTemplate (
	@currentUserId INT
	, @id INT 
	, @html NVARCHAR(MAX)
	, @name NVARCHAR(50)
	, @newId INT OUTPUT
)
AS
SET NOCOUNT ON

MERGE Staff.EmailTemplates TRG USING (SELECT @id Id) SRC ON
	TRG.Id = SRC.Id
WHEN NOT MATCHED AND NULLIF(@id, 0) IS NULL THEN INSERT (Html, Name, UserId) VALUES (@html, @name, @currentUserId)
WHEN MATCHED AND TRG.UserId = @currentUserId THEN UPDATE SET Html = @html, Name = @name; -- the owner of the template is the only one that can update their templates.

SET @newId = IIF(NULLIF(@id, 0) IS NULL, SCOPE_IDENTITY(), @id)