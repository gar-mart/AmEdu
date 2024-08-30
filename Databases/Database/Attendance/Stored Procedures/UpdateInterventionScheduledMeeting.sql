CREATE PROCEDURE Attendance.UpdateInterventionScheduledMeeting
	@currentUserId INT
	, @interventionId INT
	, @isCompleted BIT
	, @status TINYINT
	, @dateOfMeeting DATE
AS
SET NOCOUNT ON

IF Attendance.fnUserCanEditIntervention(@currentUserId, @interventionId, DEFAULT) = 0
	RETURN 50401

MERGE Attendance.InterventionScheduledMeetings TRG USING (SELECT @interventionId InterventionId) SRC ON 
	TRG.InterventionId = SRC.InterventionId
WHEN NOT MATCHED THEN 
	INSERT (InterventionId, CompletedByUserId, CompletedDate, IsCompleted, Status, DateOfMeeting) 
	VALUES (
		@interventionId
		, IIF(@isCompleted = 1, @currentUserId, NULL)
		, IIF(@isCompleted = 1, SYSUTCDATETIME(), NULL)
		, @isCompleted
		, @status
		, @dateOfMeeting
	)
WHEN MATCHED THEN UPDATE SET
	CompletedByUserId = IIF(@isCompleted = 1, @currentUserId, NULL)
	, CompletedDate = IIF(@isCompleted = 1, SYSUTCDATETIME(), NULL)
	, IsCompleted = @isCompleted
	, Status = @status
	, DateOfMeeting = @dateOfMeeting;
