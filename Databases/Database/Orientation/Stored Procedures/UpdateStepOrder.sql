CREATE PROCEDURE Orientation.UpdateStepOrder (
	@steps Tvp.Steps READONLY
)
AS
SET NOCOUNT ON

MERGE Orientation.Steps s USING @steps SRC ON s.Id = SRC.Id
	WHEN MATCHED THEN UPDATE SET
		OrderBy = SRC.OrderBy;