CREATE PROCEDURE Student.ReturnQuoteOfTheDay (
	@date DATE
)
AS
SET NOCOUNT ON

; WITH MyGradesQuoteOfTheDay AS (
	SELECT 
		ROW_NUMBER() OVER(ORDER BY a.OrderBy) - 1 DayId 
		, a.Author
		, a.Quote
		, a.BaselineDate
	FROM Staff.QuoteMetadata a
)
SELECT 
	Author
	, Quote
FROM MyGradesQuoteOfTheDay
CROSS APPLY (
	SELECT COUNT(*) QuoteCount
	FROM MyGradesQuoteOfTheDay
) a
WHERE DayId = (DATEDIFF(DAY, BaselineDate, @date) % a.QuoteCount) 