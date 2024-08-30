CREATE PROCEDURE Common.ReturnUserByGoogleId (
	@googleId AS NVARCHAR(100)
)
AS
SET NOCOUNT ON

SELECT 
	a.Id
	, a.GoogleId
	, a.AppointmentLink
	, a.Email
	, a.FirstName
	, a.GradeLevel
	, a.IsAdmin
	, a.IsReFuelCoordinator
	, a.IsStaff
	, a.LastName
	, a.MentorId
	, a.Name
	, a.SecondaryMentorId
	, a.IsMentor
	, a.IsSecondaryMentor
	, a.IsInterventionist
	, a.IsTeacher
FROM Common.vwUsers a
WHERE a.GoogleId = @googleId
	AND a.IsActive = 1

SELECT c.GradeLevel
FROM Common.Counselors c
INNER JOIN Common.Users u ON c.UserId = u.Id
WHERE GoogleId = @googleId

