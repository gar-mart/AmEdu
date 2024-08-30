CREATE PROCEDURE Security.CreateAspNetRole (
	@name NVARCHAR(256)
	, @area NVARCHAR(256)
)
AS
SET NOCOUNT ON

DECLARE @Id NVARCHAR(240) = (SELECT TOP 1 Id FROM Security.AspNetRoles WHERE Name = @name)
	, @AreaId NVARCHAR(240) = (SELECT TOP 1 Id FROM Security.AspNetRoles WHERE Name = @area)

-- The role was already created from builtin identity code, this it just adding the role to places that should get access be default.

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

		INSERT INTO Security.AspNetGroupRoles(GroupId, RoleId)
		SELECT GroupId, @Id
		FROM Security.AspNetGroupRoles WHERE RoleId = @AreaId


		INSERT INTO Security.AspNetUserRoles(UserId, RoleId)
		SELECT UserId, @Id
		FROM Security.AspNetUserRoles WHERE RoleId = @AreaId

	COMMIT TRANSACTION
END TRY
BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH
