CREATE PROCEDURE Staff.SyncReFuelInquiry (
	@date DATE
	, @generalInquiry NVARCHAR(500)
	, @breakfastInquiry NVARCHAR(500)
	, @lunchInquiry NVARCHAR(500)
)
AS
SET NOCOUNT ON

;MERGE Staff.ReFuelInquiries trg USING (SELECT @date Date) src ON trg.Date = src.Date
WHEN NOT MATCHED THEN INSERT (Date, GeneralInquiry, BreakfastInquiry, LunchInquiry) VALUES (
	@date
	, @generalInquiry
	, @breakfastInquiry
	, @lunchInquiry
)
WHEN MATCHED THEN UPDATE SET
	GeneralInquiry = @generalInquiry
	, BreakfastInquiry = @breakfastInquiry
	, LunchInquiry = @lunchInquiry
;
