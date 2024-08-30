CREATE PROCEDURE Security.ReturnUsersForGroup (
	@id UNIQUEIDENTIFIER
)
AS
SET NOCOUNT ON

SELECT
	b.UserId
FROM Security.AspNetUserGroups a
INNER JOIN Common.Users b ON a.UserId = b.IdentityId AND a.GroupId = @id
ORDER BY b.FirstName, b.LastName