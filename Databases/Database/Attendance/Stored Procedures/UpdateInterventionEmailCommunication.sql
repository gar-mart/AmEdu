CREATE PROCEDURE Attendance.UpdateInterventionEmailCommunication
	@currentUserId INT
	, @interventionId INT
	, @isCompleted BIT
	, @email NVARCHAR(MAX)
AS
SET NOCOUNT ON

IF Attendance.fnUserCanEditIntervention(@currentUserId, @interventionId, DEFAULT) = 0
	RETURN 50401

MERGE Attendance.InterventionEmailCommunications TRG USING (SELECT @interventionId InterventionId) SRC ON 
	TRG.InterventionId = SRC.InterventionId
WHEN NOT MATCHED THEN 
	INSERT (InterventionId, CompletedByUserId, CompletedDate, IsCompleted, Email) 
	VALUES (
		@interventionId
		, IIF(@isCompleted = 1, @currentUserId, NULL)
		, IIF(@isCompleted = 1, SYSUTCDATETIME(), NULL)
		, @isCompleted
		, @email
	)
WHEN MATCHED THEN UPDATE SET
	CompletedByUserId = IIF(@isCompleted = 1, @currentUserId, NULL)
	, CompletedDate = IIF(@isCompleted = 1, SYSUTCDATETIME(), NULL)
	, IsCompleted = @isCompleted
	, Email	= IIF(@email IS NULL, Email, @email); -- don't allow the Email field to be nulled