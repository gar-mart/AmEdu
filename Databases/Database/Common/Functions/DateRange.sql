CREATE FUNCTION Common.DateRange
(
	@startDate DATETIME
	, @endDate DATETIME
	, @groupBy TINYINT -- 0=Hour, 1=Day, 2=Week, 3=Month, 4=Quarter, 5=Year, 6=15 Minutes
)
RETURNS TABLE AS 
RETURN (
	WITH
	L0  AS (SELECT c FROM (SELECT 1 UNION ALL SELECT 1) AS D(c))
	, L1  AS (SELECT 1 AS c FROM L0 AS A CROSS JOIN L0 AS B)
	, L2  AS (SELECT 1 AS c FROM L1 AS A CROSS JOIN L1 AS B)
	, L3  AS (SELECT 1 AS c FROM L2 AS A CROSS JOIN L2 AS B)
	, L4  AS (SELECT 1 AS c FROM L2 AS A CROSS JOIN L3 AS B)
	, Shifts AS (SELECT (ROW_NUMBER() OVER(ORDER BY (SELECT NULL)) - 1) Shift FROM L4)
	, Dates AS (
		SELECT 
		CASE @groupBy
			WHEN 0 THEN DATEADD(HOUR, Shift, @startDate)
			WHEN 1 THEN DATEADD(DAY, Shift, @startDate)
			WHEN 2 THEN DATEADD(DAY, 7 * Shift, @startDate)
			WHEN 3 THEN DATEADD(MONTH, Shift, @startDate)
			WHEN 4 THEN DATEADD(MONTH, 3 * Shift, @startDate)
			WHEN 5 THEN DATEADD(YEAR, Shift, @startDate)
			WHEN 6 THEN DATEADD(MINUTE, 15 * Shift, @startDate)
			END StartDate
		, CASE @groupBy
			WHEN 0 THEN DATEADD(HOUR, Shift + 1, @startDate)
			WHEN 1 THEN DATEADD(DAY, -1, DATEADD(DAY, Shift + 1, @startDate))
			WHEN 2 THEN DATEADD(DAY, -1, DATEADD(DAY, 7 * (Shift + 1), @startDate))
			WHEN 3 THEN DATEADD(DAY, -1, DATEADD(MONTH, Shift + 1, @startDate))
			WHEN 4 THEN DATEADD(DAY, -1, DATEADD(MONTH, 3 * (Shift + 1), @startDate))
			WHEN 5 THEN DATEADD(DAY, -1, DATEADD(YEAR, Shift + 1, @startDate))
			WHEN 6 THEN DATEADD(MINUTE, 15 * (Shift + 1), @startDate)
			END EndDate
		FROM Shifts
	)
	SELECT StartDate, EndDate
	FROM Dates
	WHERE StartDate <= @endDate
)