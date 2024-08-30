CREATE PROCEDURE Student.PromoteReFuelStandbyPositions 
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	DECLARE @StandbyReservations TABLE (StudentId INT, [Date] DATE, NormalizedStandbyPosition INT, SpotsClaimed INT, IsPromoted BIT)
	INSERT INTO @StandbyReservations
	SELECT 
		a.*
		, IIF(ReFuel.MaxOpenPositions - SpotsClaimed >= NormalizedStandbyPosition, 1, 0)
	FROM (
		SELECT
			StudentId
			, [Date]
			, NormalizedStandbyPosition = ROW_NUMBER() OVER (PARTITION BY [Date] ORDER BY StandbyPosition)
			, b.SpotsClaimed
		FROM Student.ReFuelReservations a
		CROSS APPLY (
			SELECT COUNT(*) SpotsClaimed 
			FROM Student.ReFuelReservations b
			WHERE b.StandbyPosition IS NULL
				AND a.Date = b.Date
				AND b.RejectReasonType IS NULL
		) b
		WHERE [Date] >= CAST(Common.CurrentEasternTime() AS DATE)
			AND StandbyPosition IS NOT NULL
			AND RejectReasonType IS NULL
	) a, Staff.ReFuel

	-- first promote reservations
	UPDATE a SET
		StandbyPosition = IIF(IsPromoted = 1, NULL, StandbyPosition)
	FROM Student.ReFuelReservations a
	INNER JOIN @StandbyReservations b ON a.StudentId = b.StudentId AND a.[Date] = b.[Date]

	-- second normalize standby positions
	;WITH Reservations AS (
		SELECT 
			*
			, NormalizedStandbyPosition = ROW_NUMBER() OVER (PARTITION BY [Date] ORDER BY 
				IIF(StandbyPosition IS NULL, 1, 0)
				, StandbyPosition
			)
		FROM Student.ReFuelReservations a
		WHERE [Date] >= CAST(Common.CurrentEasternTime() AS DATE)
	)
	UPDATE Reservations SET
		StandbyPosition = IIF(
			StandbyPosition IS NULL
			, NULL
			, NormalizedStandbyPosition)

	SELECT 
		Users.Name
		, Users.Email
		, Reservations.Date
	FROM @StandbyReservations Reservations
	INNER JOIN Common.Users ON Reservations.StudentId = Users.Id
	WHERE IsPromoted = 1

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH