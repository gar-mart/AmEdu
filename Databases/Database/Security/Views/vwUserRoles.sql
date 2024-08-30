CREATE VIEW Security.vwUserRoles
AS

WITH cte AS (
	SELECT b.UserId, c.Name
	FROM Security.AspNetUserRoles b
	INNER JOIN Security.AspNetRoles c ON b.RoleId = c.Id
	UNION

	SELECT c.UserId, d.Name
	FROM Security.AspNetGroupRoles b
	INNER JOIN Security.AspNetUserGroups c ON b.GroupId = c.GroupId
	INNER JOIN Security.AspNetRoles d ON b.RoleId = d.Id
) 

SELECT DISTINCT c.UserId, a.Name RoleName
FROM cte a
LEFT JOIN cte b ON a.Name + '|REVOKE' = b.Name AND a.UserId = b.UserId
INNER JOIN Common.Users c ON a.UserId = c.IdentityId
WHERE a.Name NOT LIKE '%|REVOKE'AND b.Name IS NULL