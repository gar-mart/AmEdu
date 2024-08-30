-- Summary: 
--   Returns intervention email communication records for in progress interventions that do not have a scheduled meeting date set.
--   In addition, it will set the Email Communication record as "reminder sent" internally so that more than one reminder may not be sent out.
CREATE PROCEDURE Attendance.ReturnAndUpdateScheduleMeetingReminderEmails
AS
SET NOCOUNT ON

DECLARE @Interventions TABLE (Id INT)

INSERT INTO @Interventions
SELECT i.Id
FROM Attendance.Interventions i
INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
INNER JOIN Attendance.InterventionEmailCommunications ec ON i.Id = ec.InterventionId
LEFT JOIN Attendance.InterventionScheduledMeetings sm ON i.Id = sm.InterventionId
WHERE sm.DateOfMeeting IS NULL
	AND i.Status = 0 -- in progress
	AND ec.ScheduleMeetingReminderSent = 0
	AND NULLIF(ec.Email, '') IS NOT NULL
	AND DATEDIFF(DAY, i.GeneratedDate, Common.CurrentEasternTime()) >= 7 -- has to be at least 7 days
	AND NOT EXISTS ( -- and no flags for this student exists within 7 days of intervention being generated
		SELECT * 
		FROM Attendance.EngagementFlags ef2
		WHERE DATEDIFF(DAY, i.GeneratedDate, ef2.WeekOfDate) BETWEEN 0 AND 7
			AND ef2.UserId = ef.UserId
			AND ef2.Id <> ef.Id
	)

UPDATE Attendance.InterventionEmailCommunications SET
	ScheduleMeetingReminderSent = 1
WHERE InterventionId IN (SELECT Id FROM @Interventions)

SELECT 
	ec.Email
	, ec.InterventionId
FROM Attendance.InterventionEmailCommunications ec
WHERE ec.InterventionId IN (SELECT Id FROM @Interventions)

SELECT
	i.Id
	, i.Level
FROM @Interventions ids 
INNER JOIN Attendance.Interventions i ON ids.Id = i.Id