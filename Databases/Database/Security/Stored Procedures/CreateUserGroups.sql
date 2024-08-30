CREATE PROCEDURE Security.CreateUserGroups (
	@userId INT
	, @groupIds Tvp.UniqueIdentifierList READONLY
)
AS
SET NOCOUNT ON

DECLARE @UserIdGuid UNIQUEIDENTIFIER = (
	SELECT IdentityId Id
	FROM Common.Users 
	WHERE UserId = @userId
)

;WITH trg AS (
	SELECT *
	FROM Security.AspNetUserGroups
	WHERE UserId = @UserIdGuid
)
MERGE trg USING @groupIds src 
	ON trg.UserId = src.Value
WHEN NOT MATCHED BY TARGET THEN 
	INSERT (
		GroupId
		, UserId
	) VALUES (
		src.Value, 
		@UserIdGuid
	)
WHEN NOT MATCHED BY SOURCE THEN 
	DELETE
;
