CREATE PROCEDURE Security.ReturnEffectiveRolesForUser (
	@id INT
	, @includeRevoked BIT
)
AS
SET NOCOUNT ON

-- Security.ReturnEffectiveRolesForUser 4, 0

DECLARE @UserId NVARCHAR(450) = (SELECT IdentityId FROM Common.Users WHERE UserId = @id)

SELECT
	a.Name
FROM Security.AspNetRoles a
WHERE (EXISTS (
	SELECT *
	FROM Security.AspNetUserRoles b
	WHERE a.Id = b.RoleId AND b.UserId = @UserId
)
OR EXISTS (
	SELECT *
	FROM Security.AspNetGroupRoles b
	JOIN Security.AspNetUserGroups c ON b.GroupId = c.GroupId
	WHERE a.Id = b.RoleId AND c.UserId = @UserId
))
AND @includeRevoked = 1

UNION ALL

SELECT a.RoleName
FROM Security.vwUserRoles a
WHERE a.UserId = @id
AND @includeRevoked = 0
