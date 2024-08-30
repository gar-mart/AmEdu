CREATE PROCEDURE Attendance.SetInterventionStatus
	@currentUserId INT
	, @id INT
	, @status TINYINT -- 0 = InProgress, 1 = Completed, 2 = Uncompleted, 3 = Voided
AS
SET NOCOUNT ON

IF Attendance.fnUserCanEditIntervention(@currentUserId, @id, @status) = 0 
	RETURN 50401 -- not authorized
	
BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	UPDATE Attendance.Interventions SET
		Status = @status
		, CompletedByUserId = IIF(@status = 0, NULL, @currentUserId)
		, CompletedDate = IIF(@status = 0, NULL, SYSUTCDATETIME())
	WHERE Id = @id

	IF @status = 3 -- when voiding an intervention, the engagement flag must be rejected
		UPDATE Attendance.EngagementFlags SET
			ApprovedStatus = 0
			, RejectedReason = 'Intervention voided'
			, StaffId = @currentUserId
		WHERE Id = @id

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH



