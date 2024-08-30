CREATE PROCEDURE Common.SetTeacher(
	@userId INT
	, @isTeacher BIT
)
AS
SET NOCOUNT ON

DECLARE @GroupId UNIQUEIDENTIFIER = (
	SELECT Id
	FROM Security.AspNetGroups 
	WHERE Name = 'Teacher'
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
WHEN MATCHED AND @isTeacher = 0 THEN DELETE
WHEN NOT MATCHED AND @isTeacher = 1 THEN INSERT (GroupId, UserId) VALUES (@GroupId, src.IdentityId);
