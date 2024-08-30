CREATE PROCEDURE Security.ReturnAspNetGroupById (
	@id UNIQUEIDENTIFIER
)
AS
SET NOCOUNT ON

SELECT
	CAST(a.Id AS UNIQUEIDENTIFIER) Id
	, a.Name
	, a.Description
FROM Security.AspNetGroups a
WHERE a.Id = @id

SELECT 
	a.Id
	, a.Name
	, IIF(b.GroupId IS NULL, 0, 1) IsSelected
FROM Security.AspNetRoles a
LEFT JOIN Security.AspNetGroupRoles b ON a.Id = b.RoleId AND b.GroupId = @id
ORDER BY a.Name
