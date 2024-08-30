CREATE PROCEDURE Common.ReturnCounselors (
	@gradeLevel NVARCHAR(2) = NULL
)
AS
SET NOCOUNT ON

SELECT
	u.Name
	, u.Email
	, u.Id
FROM Common.Users u
INNER JOIN Common.Counselors c ON u.Id = c.UserId
WHERE c.GradeLevel = ISNULL(@gradeLevel, c.GradeLevel)
ORDER BY 
	u.Name