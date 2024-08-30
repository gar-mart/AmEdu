CREATE PROCEDURE Attendance.UpdateInterventionSuccessPlan
	@currentUserId INT
	, @interventionId INT
	, @isCompleted BIT
	, @successPlanCreatedDate DATE
	, @successPlanNotCreated BIT
AS
SET NOCOUNT ON

IF Attendance.fnUserCanEditIntervention(@currentUserId, @interventionId, DEFAULT) = 0
	RETURN 50401

MERGE Attendance.InterventionSuccessPlans TRG USING (SELECT @interventionId InterventionId) SRC ON 
	TRG.InterventionId = SRC.InterventionId
WHEN NOT MATCHED THEN 
	INSERT (InterventionId, CompletedByUserId, CompletedDate, IsCompleted, SuccessPlanCreatedDate, SuccessPlanNotCreated) 
	VALUES (
		@interventionId
		, IIF(@isCompleted = 1, @currentUserId, NULL)
		, IIF(@isCompleted = 1, SYSUTCDATETIME(), NULL)
		, @isCompleted
		, @successPlanCreatedDate
		, @successPlanNotCreated
	)
WHEN MATCHED THEN UPDATE SET
	CompletedByUserId = IIF(@isCompleted = 1, @currentUserId, NULL)
	, CompletedDate = IIF(@isCompleted = 1, SYSUTCDATETIME(), NULL)
	, IsCompleted = @isCompleted
	, SuccessPlanCreatedDate = @successPlanCreatedDate
	, SuccessPlanNotCreated = @successPlanNotCreated;