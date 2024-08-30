CREATE PROCEDURE Security.CreateGroupUsers (
	@groupId NVARCHAR(256)
	, @userIds Tvp.IntegerList READONLY
)
AS
SET NOCOUNT ON

; WITH trg AS (
	SELECT *
	FROM Security.AspNetUserGroups
	WHERE GroupId = @groupId
), src AS (
	SELECT b.IdentityId Id
	FROM @userIds a 
	INNER JOIN 
	Common.Users b ON a.Value = b.UserId
)
MERGE trg USING src 
	ON trg.UserId = src.Id
WHEN NOT MATCHED BY TARGET THEN 
	INSERT (
		GroupId
		, UserId
	) VALUES (
		@groupId
		, src.Id
	)
WHEN NOT MATCHED BY SOURCE THEN 
	DELETE
;