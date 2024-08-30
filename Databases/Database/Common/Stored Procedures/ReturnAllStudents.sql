CREATE PROCEDURE Common.ReturnAllStudents
AS
SET NOCOUNT ON

SELECT
	  a.Id
	, a.LastName + ', ' + a.FirstName Name
	, a.GradeLevel
	, a.OrientationStartTime
	, a.OrientationFinishTime
	, b.Id MentorId
	, b.Name MentorName
	, b.Email MentorEmail
	, IIF(d.TotalSteps = 0, 0, f.CompletedSteps * 1.0 / d.TotalSteps) ProgressPercent
	, f.CompletedSteps
	, d.TotalSteps
	, (48*60 - DATEDIFF(MINUTE, a.OrientationStartTime, SYSDATETIME())) / 60 HoursRemaining
	, (48*60 - DATEDIFF(MINUTE, a.OrientationStartTime, SYSDATETIME())) % 60 MinutesRemaining	
	, a.Email StudentEmail
	, CASE 
		WHEN cs.WayToReachAsStudent = 1 THEN 'Email'
		WHEN cs.WayToReachAsStudent = 2 THEN 'Phone'
		WHEN cs.WayToReachAsStudent = 3 THEN 'Text'
	 END PreferredContactMethod
	, cs.ContactAsStudentInfo as PreferredContactInfo
	, a.SecondaryMentorId
FROM Common.vwUsers a
LEFT JOIN Common.Users b ON a.MentorId = b.Id
LEFT JOIN Orientation.Step_ConnectionSurvey cs on a.Id = cs.UserId
CROSS APPLY(
	SELECT COUNT(*) TotalSteps 
	FROM Orientation.vwStudentSteps
	WHERE UserId = a.Id
		AND IsActive = 1
) d
CROSS APPLY(
	SELECT COUNT(*) CompletedSteps 
	FROM Orientation.CompletedSteps e 
	INNER JOIN Orientation.vwStudentSteps g ON e.StepId = g.StepId AND e.UserId = g.UserId
	WHERE e.UserId = a.Id 
		AND g.IsActive = 1
) f
WHERE a.IsStaff = 0 AND a.IsActive = 1
ORDER BY a.LastName