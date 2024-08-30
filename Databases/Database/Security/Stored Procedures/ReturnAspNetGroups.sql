CREATE PROCEDURE Security.ReturnAspNetGroups
AS
SET NOCOUNT ON

SELECT
	CAST(a.Id AS UNIQUEIDENTIFIER) Id
	, a.Name
	, a.Description
	, b.UserCount
	, c.RolesGrantedCount
	, c.RolesRevokedCount
FROM Security.AspNetGroups a
CROSS APPLY (
	SELECT COUNT(*) UserCount
	FROM Security.AspNetUserGroups b1
	WHERE a.Id = b1.GroupId
) b
CROSS APPLY (
	SELECT SUM(IIF(c2.Name NOT LIKE '%|REVOKE', 1, 0)) RolesGrantedCount, SUM(IIF(c2.Name LIKE '%|REVOKE', 1, 0)) RolesRevokedCount
	FROM Security.AspNetGroupRoles c1
	INNER JOIN Security.AspNetRoles c2 ON c1.RoleId = c2.Id AND CHARINDEX('_', c2.Name) > 0
	WHERE a.Id = c1.GroupId
) c
ORDER BY a.Name