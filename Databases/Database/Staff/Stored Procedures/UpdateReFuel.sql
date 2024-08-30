CREATE PROCEDURE Staff.UpdateReFuel (
	@maxOpenPositions INT
	, @maxStandbyPositions INT
	, @breakfastOffered BIT
	, @lunchOffered BIT
	, @currentUserId INT
)
AS
SET NOCOUNT ON
IF NOT EXISTS (SELECT * FROM Common.vwUsers WHERE Id = @currentUserId AND (IsReFuelCoordinator = 1 OR IsAdmin = 1)) 
	THROW 50000, 'User is not an admin or re:fuel coordinator', 0

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	-- there is only ever one record and it's ID is 1
	--    either make sure it exists or create it
	MERGE Staff.ReFuel Target USING (SELECT 1 Id) Source
		ON Target.Id = Source.Id
	WHEN NOT MATCHED THEN INSERT (MaxOpenPositions, MaxStandbyPositions, BreakfastOffered, LunchOffered, UpdatedUserId, UpdatedDate) VALUES (
		@maxOpenPositions
		, @maxStandbyPositions
		, @breakfastOffered
		, @lunchOffered
		, @currentUserId
		, SYSUTCDATETIME()
	)
	WHEN MATCHED THEN UPDATE SET
		MaxOpenPositions = @maxOpenPositions
		, MaxStandbyPositions = @maxStandbyPositions
		, BreakfastOffered = @breakfastOffered
		, LunchOffered = @lunchOffered
		, UpdatedUserId = @currentUserId
		, UpdatedDate = SYSUTCDATETIME();

	EXEC Student.PromoteReFuelStandbyPositions

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH
