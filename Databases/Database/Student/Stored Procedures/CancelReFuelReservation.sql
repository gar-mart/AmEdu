CREATE PROCEDURE Student.CancelReFuelReservation (
	@currentUserId INT
	, @date DATE
)
AS
SET NOCOUNT ON

UPDATE Student.ReFuelReservations SET
	RejectReasonType = 0 -- student cancelled reservation
WHERE StudentId = @currentUserId
	AND [Date] = @date

EXEC Student.PromoteReFuelStandbyPositions
