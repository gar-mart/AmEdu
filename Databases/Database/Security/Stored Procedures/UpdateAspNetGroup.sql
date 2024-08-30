CREATE PROCEDURE Security.UpdateAspNetGroup (	
	@currentUserId INT
	, @currentUserTimeZoneId SYSNAME
	, @id NVARCHAR(240)
	, @name VARCHAR(256)
	, @description VARCHAR(256)
)
AS
SET NOCOUNT ON

UPDATE Security.AspNetGroups
SET
	Name = @name
	, Description = @description
	, UpdatedDate = SYSUTCDATETIME()
	, UpdatedUserId = @currentUserId
WHERE Id = @id