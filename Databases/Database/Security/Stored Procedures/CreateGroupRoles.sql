CREATE PROCEDURE Security.CreateGroupRoles (
	@groupId UNIQUEIDENTIFIER
	, @roleIds Tvp.UniqueIdentifierList READONLY
)
AS
SET NOCOUNT ON

; WITH trg AS (
	SELECT *
	FROM Security.AspNetGroupRoles
	WHERE GroupId = @groupId
)
MERGE trg USING @roleIds src 
	ON trg.GroupId = src.Value
WHEN NOT MATCHED BY TARGET THEN 
	INSERT (
		GroupId
		, RoleId
	) VALUES (
		@groupId
		, src.Value
	)
WHEN NOT MATCHED BY SOURCE THEN 
	DELETE
;
