CREATE PROCEDURE Common.ReturnMentorStudents(
	@mentorId INT
)
AS
SET NOCOUNT ON

SELECT
	  a.Id
	, a.LastName + ', ' + a.FirstName Name
	, a.GradeLevel
	, IIF(d.TotalSteps = 0, 0, f.CompletedSteps * 1.0 / d.TotalSteps) ProgressPercent
	, f.CompletedSteps
	, d.TotalSteps
	, a.OrientationStartTime
	, a.OrientationFinishTime
	, (48*60 - DATEDIFF(MINUTE, a.OrientationStartTime, SYSDATETIME())) / 60 HoursRemaining
	, (48*60 - DATEDIFF(MINUTE, a.OrientationStartTime, SYSDATETIME())) % 60 MinutesRemaining	
	, c.Picture StudentPicture
	, a.Email StudentEmail
	, CASE 
		WHEN cs.WayToReachAsStudent = 1 THEN 'Email'
		WHEN cs.WayToReachAsStudent = 2 THEN 'Phone'
		WHEN cs.WayToReachAsStudent = 3 THEN 'Text'
	 END PreferredContactMethod
	, cs.ContactAsStudentInfo as PreferredContactInfo
FROM Common.Users a
LEFT JOIN Common.Users b ON a.MentorId = b.Id
LEFT JOIN Orientation.Step_SendUsASelfie c on a.Id = c.UserId
LEFT JOIN Orientation.Step_ConnectionSurvey cs on a.Id = cs.UserId
CROSS APPLY(
	SELECT COUNT(*) TotalSteps 
	FROM Orientation.vwStudentSteps c
	WHERE c.UserId = a.Id
		AND IsActive = 1
) d
CROSS APPLY(
	SELECT COUNT(*) CompletedSteps 
	FROM Orientation.CompletedSteps e
	INNER JOIN Orientation.vwStudentSteps g ON g.UserId = e.UserId AND e.StepId = g.StepId
	WHERE e.UserId = a.Id
		AND g.IsActive = 1
) f
WHERE (a.MentorId = @mentorId or a.SecondaryMentorId = @mentorId) AND a.IsActive = 1
ORDER BY a.LastName