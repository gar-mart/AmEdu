CREATE PROCEDURE Common.SetAdmin(
	@userId INT
	, @isAdmin BIT
)
AS
SET NOCOUNT ON

DECLARE @GroupId UNIQUEIDENTIFIER = (
	SELECT Id
	FROM Security.AspNetGroups 
	WHERE Name = 'Admin'
)

;WITH trg AS (
	SELECT * 
	FROM Security.AspNetUserGroups 
	WHERE GroupId = @GroupId
		AND UserId IN (SELECT IdentityId FROM Common.Users WHERE Id = @userId)
)
, src AS (
	SELECT *
	FROM Common.Users
	WHERE Id = @userId
)
MERGE trg USING src ON trg.UserId = src.IdentityId
WHEN MATCHED AND @isAdmin = 0 THEN DELETE
WHEN NOT MATCHED AND @isAdmin = 1 THEN INSERT (GroupId, UserId) VALUES (@GroupId, src.IdentityId);

