CREATE PROCEDURE Staff.ReturnStudentSearchInformation (
	@currentUserId INT
)
AS
SET NOCOUNT ON

DECLARE @beginningOfWeek DATETIME2(0) = (
	SELECT BeginningOfWeek
	FROM Common.GetBeginningOfWeek(DEFAULT)
)

SELECT
	  a.Id
	, a.LastName + ', ' + a.FirstName Name
	, a.FirstName
	, a.LastName
	, a.GradeLevel
	, a.MentorId
	, a.Email StudentEmail
	, CASE WHEN h.HasStudents = 0 OR @currentUserId IN (a.MentorId, a.SecondaryMentorId) THEN 1 ELSE 0 END IsMyStudent
	, p.MissedLastWeeksRequirements
	, f.CompletedSteps
	, (48*60 - DATEDIFF(MINUTE, a.OrientationStartTime, SYSDATETIME())) / 60 HoursRemaining
	, (48*60 - DATEDIFF(MINUTE, a.OrientationStartTime, SYSDATETIME())) % 60 MinutesRemaining
	, IIF(d.TotalSteps = 0, 0, f.CompletedSteps * 1.0 / d.TotalSteps) ProgressPercent
	, d.TotalSteps
	, a.OrientationStartTime
	, a.OrientationFinishTime
	, a.SecondaryMentorId	
	, a.HasAccomodations
	, ISNULL(info.StudentBirthday, cs.StudentBirthday) StudentBirthday
	, ISNULL(info.GuardianEmailAddress, cs.GuardianEmailAddress) GuardianEmailAddress
	, ISNULL(info.SecondaryGuardianEmailAddress, cs.SecondaryGuardianEmailAddress) SecondaryGuardianEmailAddress
	, ISNULL(info.GuardianIsSubscribedToWeeklySnapshotEmail, cs.GuardianIsSubscribedToWeeklySnapshotEmail) GuardianIsSubscribedToWeeklySnapshotEmail
	, info.SecondaryGuardianIsSubscribedToWeeklySnapshotEmail -- not available on cs table
FROM Common.vwUsers a
LEFT JOIN Orientation.Step_ConnectionSurvey cs on a.Id = cs.UserId
LEFT JOIN Student.Information info ON a.Id = info.StudentId
CROSS APPLY(
	SELECT COUNT(*) TotalSteps 
	FROM Orientation.vwStudentSteps c
	WHERE c.UserId = a.Id
		AND c.IsActive = 1
) d
CROSS APPLY(
	SELECT COUNT(*) CompletedSteps 
	FROM Orientation.CompletedSteps e 
	INNER JOIN Orientation.StepGradeLevel g ON g.GradeLevel = a.GradeLevel AND e.StepId = g.StepId
	INNER JOIN Orientation.Steps i ON e.StepId = i.Id AND i.IsActive = 1
	WHERE e.UserId = a.Id 
) f
CROSS APPLY (
	SELECT IIF(EXISTS(
		SELECT * 
		FROM Common.Users h1 
		WHERE h1.MentorId = @currentUserId
			OR h1.SecondaryMentorId = @currentUserId
	), 1, 0) HasStudents
) h
CROSS APPLY (
	SELECT CASE WHEN
		EXISTS (
			SELECT *
			FROM Attendance.vwCurrentEngagementFlags p
			WHERE 
				p.UserId = a.Id
				AND p.WeekOfDate = CAST(@beginningOfWeek AS DATE)
		)
	    THEN 1
	    ELSE 0
	END MissedLastWeeksRequirements 
) p
WHERE a.IsStaff = 0 AND a.IsActive = 1
ORDER BY a.LastName