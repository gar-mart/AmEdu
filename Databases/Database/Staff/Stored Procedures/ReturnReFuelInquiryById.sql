CREATE PROCEDURE Staff.ReturnReFuelInquiryById (
	@date DATE
)
AS
SET NOCOUNT ON

IF NOT EXISTS (SELECT * FROM Staff.ReFuelInquiries WHERE Date = @date)
	INSERT INTO Staff.ReFuelInquiries (Date) VALUES (@date) -- initialize the record

SELECT	
	i.Date
	, i.GeneralInquiry
	, i.BreakfastInquiry
	, i.LunchInquiry
FROM Staff.ReFuelInquiries i
WHERE i.Date = @date
