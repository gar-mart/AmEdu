CREATE PROCEDURE Security.ReturnGroupsForUser (
	@id INT
)
AS
SET NOCOUNT ON

DECLARE @UserId NVARCHAR(450) = (SELECT IdentityId FROM Common.Users WHERE UserId = @id)

SELECT
	CAST(a.Id AS UNIQUEIDENTIFIER) Id
	, a.Name
	, a.Description
	, c.RolesGrantedCount
	, c.RolesRevokedCount
FROM Security.AspNetGroups a
CROSS APPLY (
	SELECT SUM(IIF(c2.Name NOT LIKE '%|REVOKE', 1, 0)) RolesGrantedCount, SUM(IIF(c2.Name LIKE '%|REVOKE', 1, 0)) RolesRevokedCount
	FROM Security.AspNetGroupRoles c1
	INNER JOIN Security.AspNetRoles c2 ON c1.RoleId = c2.Id AND CHARINDEX('_', c2.Name) > 0
	WHERE a.Id = c1.GroupId
) c
INNER JOIN Security.AspNetUserGroups b ON a.Id = b.GroupId AND b.UserId = @UserId
ORDER BY a.Name