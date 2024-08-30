CREATE PROCEDURE Security.ReturnRolesForUser
	@id INT
AS
SET NOCOUNT ON

-- Unlike ReturnRolesForUser this will return all roles with source details.

DECLARE @UserId NVARCHAR(450) = (SELECT IdentityId FROM Common.Users WHERE UserId = @id)

; WITH cte AS (
	SELECT b.RoleId, NULL GroupId, NULL GroupName
	FROM Security.AspNetUserRoles b
	WHERE b.UserId = @UserId
	
	UNION ALL

	SELECT b.RoleId, b.GroupId, d.Name
	FROM Security.AspNetGroupRoles b
	INNER JOIN Security.AspNetUserGroups c ON b.GroupId = c.GroupId
	INNER JOIN Security.AspNetGroups d ON c.GroupId = d.Id
	WHERE c.UserId = @UserId
)
, cteRole AS (
	SELECT a.RoleId, STUFF((
		SELECT  ', ' + ISNULL(b.GroupName, 'User Override')
		FROM cte b
		WHERE a.RoleId = b.RoleId
		ORDER BY GroupName
		FOR XML PATH(''), TYPE).value('text()[1]','nvarchar(max)')
		, 1, LEN(',') + 1, '') AS SourceList
	FROM cte a
	GROUP BY RoleId
)

SELECT
	a.Id
	, a.Name
	, IIF(b.RoleId IS NULL, 0, 1) IsSelected
	, b.SourceList
FROM Security.AspNetRoles a
LEFT JOIN cteRole b ON a.Id = b.RoleId
ORDER BY a.Name