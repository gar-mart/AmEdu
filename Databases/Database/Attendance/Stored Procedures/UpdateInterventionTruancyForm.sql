CREATE PROCEDURE Attendance.UpdateInterventionTruancyForm
	@currentUserId INT
	, @interventionId INT
	, @isCompleted BIT
	, @markedCompleted BIT 
AS
SET NOCOUNT ON

IF Attendance.fnUserCanEditIntervention(@currentUserId, @interventionId, DEFAULT) = 0
	RETURN 50401

MERGE Attendance.InterventionTruancyForms TRG USING (SELECT @interventionId InterventionId) SRC ON 
	TRG.InterventionId = SRC.InterventionId
WHEN NOT MATCHED THEN 
	INSERT (InterventionId, CompletedByUserId, CompletedDate, IsCompleted, MarkedCompleted) 
	VALUES (
		@interventionId
		, IIF(@isCompleted = 1, @currentUserId, NULL)
		, IIF(@isCompleted = 1, SYSUTCDATETIME(), NULL)
		, @isCompleted
		, @markedCompleted
	)
WHEN MATCHED THEN UPDATE SET
	CompletedByUserId = IIF(@isCompleted = 1, @currentUserId, NULL)
	, CompletedDate = IIF(@isCompleted = 1, SYSUTCDATETIME(), NULL)
	, IsCompleted = @isCompleted
	, MarkedCompleted = @markedCompleted;