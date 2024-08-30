CREATE PROCEDURE Attendance.ReturnFlagsGeneratedReport (
	@startDate Date
	, @endDate Date
	, @chartGroupingFilter NVARCHAR(50)
	, @schoolFilter NVARCHAR(50)
	, @mentorFilter INT
)
AS
SET NOCOUNT ON



IF (@chartGroupingFilter = 'Grade Level')
BEGIN

;WITH Cte AS (
	SELECT 
		a.WeekOfDate,
		a.GradeLevel 
	FROM Attendance.EngagementFlags a
	INNER JOIN Common.Users u ON a.UserId = u.Id
	WHERE WeekOfDate BETWEEN @startDate AND @endDate
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = a.MentorId)
)

SELECT
	b.GradeLevel Label
	, COUNT(b.GradeLevel) FlagCount
	, a.StartDate Date
FROM Common.DateRange(@startDate, @endDate, 3) a
LEFT JOIN Cte b ON b.WeekOfDate BETWEEN a.StartDate AND a.EndDate
GROUP BY a.StartDate, b.GradeLevel
ORDER BY a.StartDate;
END

IF (@chartGroupingFilter = 'Cell')
BEGIN

;WITH Cte AS (
	SELECT a.WeekOfDate,
		(CASE WHEN a.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN a.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END) Cell
	FROM Attendance.EngagementFlags a
	INNER JOIN Common.Users u ON a.UserId = u.Id
	WHERE WeekOfDate BETWEEN @startDate AND @endDate
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = a.MentorId)
)
SELECT
	Cell Label
	, COUNT(Cell) FlagCount
	, a.StartDate Date
FROM Common.DateRange(@startDate, @endDate, 3) a
LEFT JOIN Cte b ON b.WeekOfDate BETWEEN a.StartDate AND a.EndDate
GROUP BY a.StartDate, Cell
ORDER BY a.StartDate;
END

IF (@chartGroupingFilter = 'Mentor')
BEGIN
;WITH Cte AS (
	SELECT
		a.WeekOfDate,
		mu.Name 
	FROM Attendance.EngagementFlags a
	INNER JOIN Common.Users u ON a.UserId = u.Id
	INNER JOIN Common.Users mu on a.MentorId = mu.Id
	WHERE WeekOfDate BETWEEN @startDate AND @endDate
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = a.MentorId)
)
SELECT
	b.Name Label
	, COUNT(b.Name) FlagCount
	, a.StartDate Date
FROM Common.DateRange(@startDate, @endDate, 3) a
LEFT JOIN Cte b ON b.WeekOfDate BETWEEN a.StartDate AND a.EndDate
GROUP BY a.StartDate, b.Name
ORDER BY a.StartDate
END