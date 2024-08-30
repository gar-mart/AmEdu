CREATE FUNCTION Common.GetBeginningOfWeek (
	@weekOfDate DATE = NULL -- using this param will return FromDateTime = @weekOfDate, otherwise current eastern time is returned
)
RETURNS TABLE AS RETURN
(
	SELECT 
		a.FromDateTime
		, c.BeginningOfWeek
	FROM (
		SELECT CASE
			WHEN @weekOfDate IS NOT NULL THEN CAST(@weekOfDate AS DATETIME2(0))
			ELSE Common.CurrentEasternTime()
		END FromDateTime
	) a
	-- get the Monday for this week
	CROSS APPLY (SELECT Monday = IIF(DATEADD(WEEK, DATEDIFF(WEEK, 0, a.FromDateTime), 0) = @weekOfDate, DATEADD(DAY, -7, @weekOfDate), DATEADD(WEEK, DATEDIFF(WEEK, 0, a.FromDateTime), 0))) temp
	-- if the Monday for this week is greater than FromDateTime, we actually want the previous Monday (will happen if FromDateTime is a Sunday
	CROSS APPLY (SELECT BeginningOfWeek = IIF(temp.Monday > FromDateTime, DATEADD(WEEK, -1, temp.Monday), Temp.Monday)) c
)
