CREATE PROCEDURE Attendance.UpdateInterventionEmailTemplate (
	@interventionLevel TINYINT
	, @emailFrom TINYINT
	, @emailSubject NVARCHAR(200)
	, @includeEngagementFlagSnapshot BIT
	, @emailBody NVARCHAR(MAX)
	, @emailTo TINYINT
	, @attachmentList Tvp.StringList READONLY
)
AS
SET NOCOUNT ON

UPDATE Attendance.InterventionEmailTemplates
SET 
	EmailFrom = @emailFrom
	, EmailSubject = @emailSubject
	, IncludeEngagementFlagSnapshot = @includeEngagementFlagSnapshot 
	, EmailBody = @emailBody
	, EmailTo = @emailTo
WHERE
	InterventionLevel = @interventionLevel

--Attachments
; WITH AttachmentList AS (
	SELECT * 
	FROM Attendance.InterventionEmailAttachments
	WHERE InterventionLevel = @interventionLevel
)
MERGE AttachmentList USING @attachmentList a
	ON AttachmentList.Filename = a.String
WHEN NOT MATCHED THEN 
	INSERT (InterventionLevel, Filename)
	VALUES (@interventionLevel, a.String)
WHEN NOT MATCHED BY SOURCE THEN 
	DELETE;
