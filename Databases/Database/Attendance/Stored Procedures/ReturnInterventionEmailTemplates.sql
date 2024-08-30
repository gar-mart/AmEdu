CREATE PROCEDURE Attendance.ReturnInterventionEmailTemplates
AS
SET NOCOUNT ON

SELECT 
	a.InterventionLevel
	, a.EmailFrom
	, a.EmailTo
	, a.EmailSubject
	, a.IncludeEngagementFlagSnapshot
	, a.EmailBody
FROM Attendance.InterventionEmailTemplates a

SELECT 
	a.Filename
	, a.InterventionLevel
FROM Attendance.InterventionEmailAttachments a
ORDER BY a.Filename