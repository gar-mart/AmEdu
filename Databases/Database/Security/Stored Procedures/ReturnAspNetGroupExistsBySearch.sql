CREATE PROCEDURE Security.ReturnAspNetGroupExistsBySearch (
	@name NVARCHAR (100)
	, @excludeId NVARCHAR(240)

)
AS
SET NOCOUNT ON


SELECT CASE WHEN EXISTS (
	SELECT TOP 1 *
	FROM Security.AspNetGroups a
	WHERE a.Name = @name AND
	   (@excludeId IS NULL OR a.Id != @excludeId)
)
THEN CAST(1 AS BIT)
ELSE CAST(0 AS BIT) 
END