-- Summary:
--   There should only be one ReFuel record, and its Id should be set to 1.
--   This proc will ensure the record exists and return that record.

CREATE PROCEDURE Staff.ReturnReFuelById (
	@id INT = 1
)
AS
SET NOCOUNT ON

IF NOT EXISTS (SELECT * FROM Staff.ReFuel WHERE Id = @id)
	INSERT INTO Staff.ReFuel (Id) VALUES (@id)

SELECT 
	MaxOpenPositions
	, MaxStandbyPositions
	, BreakfastOffered
	, LunchOffered
	, UpdatedDate
	, UpdatedUserId
FROM Staff.ReFuel