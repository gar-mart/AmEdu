CREATE PROCEDURE Common.ReturnUserByUserName(
	@userName NVARCHAR(320)
)
AS
SET NOCOUNT ON

SELECT
	  a.Id
	, a.GoogleId
	, a.Email UserName
	, a.FirstName
	, a.LastName
	, a.Name
	, a.IsStaff
	, a.IsReFuelCoordinator
	, a.IsAdmin
	, a.IsMentor
	, a.IsSecondaryMentor
	, a.IsActive
	, a.GradeLevel
	, a.IsInterventionist
	, a.IsTeacher
FROM Common.vwUsers a
WHERE a.Email = @userName

SELECT c.GradeLevel
FROM Common.Counselors c
INNER JOIN Common.Users u ON c.UserId = u.Id
WHERE Email = @userName

