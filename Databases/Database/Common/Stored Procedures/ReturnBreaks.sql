CREATE PROCEDURE Common.ReturnBreaks (
	@year SMALLINT = NULL
)
AS
SET NOCOUNT ON

DECLARE @YearDate DATE = DATEFROMPARTS(@year, 1, 1)
SELECT
	Id
	, StartDate
	, EndDate
	, Name
FROM Common.Breaks
WHERE
	@year IS NULL
	OR StartDate < DATEADD(YEAR, 1, @YearDate)
	AND EndDate >= @YearDate
ORDER BY
	StartDate