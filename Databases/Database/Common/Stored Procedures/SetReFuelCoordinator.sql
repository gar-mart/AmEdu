CREATE PROCEDURE Common.SetReFuelCoordinator(
	@userId INT
	, @isReFuelCoordinator BIT
)
AS
SET NOCOUNT ON

DECLARE @GroupId UNIQUEIDENTIFIER = (
	SELECT Id
	FROM Security.AspNetGroups 
	WHERE Name = 'ReFuel Coordinator'
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
WHEN MATCHED AND @isReFuelCoordinator = 0 THEN DELETE
WHEN NOT MATCHED AND @isReFuelCoordinator = 1 THEN INSERT (GroupId, UserId) VALUES (@GroupId, src.IdentityId);
