CREATE PROCEDURE Security.CreateAspNetGroupsDefault
AS 
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

		INSERT INTO Security.AspNetGroups(Name, Description)
		VALUES('Everyone', 'Default Group')

		DECLARE @GroupId NVARCHAR(240) = (SELECT Id FROM Security.AspNetGroups WHERE Name = 'Everyone')

		INSERT INTO Security.AspNetUserGroups(UserId, GroupId)
		SELECT IdentityId, @GroupId
		FROM Common.Users

		INSERT INTO Security.AspNetGroupRoles(RoleId, GroupId)
		SELECT Id, @GroupId
		FROM Security.AspNetRoles
		WHERE Name NOT LIKE '%|REVOKE'

	COMMIT TRANSACTION
END TRY
BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH
