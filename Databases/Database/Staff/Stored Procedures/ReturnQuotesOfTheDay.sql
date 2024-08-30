CREATE PROCEDURE Staff.ReturnQuotesOfTheDay (
	@currentUserId INT
	, @date DATE
)
AS
SET NOCOUNT ON
IF NOT EXISTS (SELECT * FROM Common.vwUsers WHERE Id = @currentUserId AND IsStaff = 1) 
	THROW 50000, 'User is not a staff user', 0

; WITH QuotesOfTheDay AS (
	-- make sure OrderBy is "normalized" (that it starts at 0 and each number after is consecutive)
	SELECT 
		a.Author
		, a.Id
		, a.Quote
		, a.BaselineDate
		, ROW_NUMBER() OVER(ORDER BY a.OrderBy) - 1 DayId
	FROM Staff.QuoteMetadata a
), QuotesOfTheDayFromToday AS (
	-- get correct order of quotes based on today using our @baselineDate as the starting point
	SELECT 
		a.Author
		, a.Id
		, a.Quote
		, ROW_NUMBER() OVER(ORDER BY 
				CASE
					WHEN a.DayId >= c.TodaysQuoteOfTheDayId THEN a.DayId 
					ELSE b.QuoteCount + a.DayId
				END 
		) - 1 OrderFromToday
	FROM QuotesOfTheDay a
	CROSS APPLY (
		SELECT COUNT(*) QuoteCount
		FROM QuotesOfTheDay
	) b
	CROSS APPLY (
		SELECT (DATEDIFF(DAY, a.BaselineDate, @date) % b.QuoteCount) TodaysQuoteOfTheDayId
	) c
)
SELECT 
	a.Author
	, a.Id
	, a.Quote	
	, CAST(DATEADD(DAY, a.OrderFromToday, @date) AS DATE) QuoteOfTheDayDate -- calculate the next date that the quote should be displayed
FROM QuotesOfTheDayFromToday a
ORDER BY a.OrderFromToday
