CREATE PROCEDURE Common.ReturnAllStaff
AS
SET NOCOUNT ON

SELECT
	  a.Id
	, a.LastName + ', ' + a.FirstName Name
	, a.GoogleId
	, a.IsMentor
	, b.MenteeCount
	, a.Email
	, a.AppointmentLink
	-- todo: update hardcoded links to use just the videoId and change the following to
	-- IntroVideoId = Link
	, IntroVideoId = IIF(
		CHARINDEX('/', Link) > 0
		, SUBSTRING( Link , LEN(Link) -  CHARINDEX('/',REVERSE(Link)) + 2  , LEN(Link)  )
		, Link)
	, a.IsReFuelCoordinator
	, a.IsAdmin
	, a.IsInterventionist
	, a.IsTeacher
	, a.IsStaff
FROM Common.vwUsers a
CROSS APPLY (
	SELECT COUNT(*) MenteeCount
	FROM Common.Users b1
	WHERE b1.MentorId = a.Id
		AND b1.IsActive = 1
) b
LEFT JOIN Orientation.IntroVideos ON a.Id = IntroVideos.MentorId
WHERE a.IsActive = 1 
	AND a.IsStaff = 1
ORDER BY a.LastName

SELECT 
	UserId
	, GradeLevel
FROM Common.Mentors
ORDER BY GradeLevel

SELECT 
	UserId
	, GradeLevel
FROM Common.Counselors
ORDER BY GradeLevel
