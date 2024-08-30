-- Summary:
--   Currently only used to reject student reservations by a staff member
CREATE PROCEDURE Student.UpdateReFuelReservation (
	@studentId INT
	, @date DATE
	, @rejectReasonType TINYINT
	, @rejectReasonComment NVARCHAR(500)
	, @currentUserId INT
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION
	
	UPDATE Student.ReFuelReservations SET
		RejectReasonType = @rejectReasonType
		, RejectReasonComment = @rejectReasonComment
		, StandbyPosition = IIF(RejectReasonType IS NOT NULL, NULL, StandbyPosition)
		, UpdatedUserId = @currentUserId
		, UpdatedDate = SYSUTCDATETIME()
	WHERE StudentId = @studentId
		AND [Date] = @date

	EXEC Student.PromoteReFuelStandbyPositions

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH