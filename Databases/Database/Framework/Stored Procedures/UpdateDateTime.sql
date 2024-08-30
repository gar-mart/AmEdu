CREATE PROCEDURE Framework.UpdateDateTime (
	@date DATE
	, @time TIME
	, @dateTime DATETIME2(3)
)
AS
SET NOCOUNT ON

MERGE Framework.DateTime trg USING (SELECT 1 Singular) src ON src.Singular = trg.Singular
WHEN NOT MATCHED THEN INSERT ([Date], [Time], [DateTime]) VALUES (@date, @time, @dateTime)
WHEN MATCHED THEN UPDATE SET
	[Date] = @date
	, [Time] = @time
	, [DateTime] = @dateTime
;