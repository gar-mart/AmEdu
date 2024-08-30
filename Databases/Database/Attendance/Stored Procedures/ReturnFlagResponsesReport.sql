CREATE PROCEDURE Attendance.ReturnFlagResponsesReport (
	@startDate Date
	, @endDate Date
	, @schoolFilter NVARCHAR(50)
	, @mentorFilter INT
)
AS
SET NOCOUNT ON

;WITH Outstanding AS (
		SELECT
		COALESCE(b.GradeLevel,'None') Label
		, COUNT(*) OutstandingCount
	FROM Attendance.EngagementFlags b
	INNER JOIN Common.Users u ON b.UserId = u.Id
	WHERE 
		IIF(@startDate <= WeekOfDate AND DATEADD(DAY,-7,WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7,WeekOfDate)), 1, 0) = 1
		AND ApprovedStatus IS NULL
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = b.MentorId)
	GROUP BY b.GradeLevel
),
Approved AS (
	SELECT
		COALESCE(c.GradeLevel,'None') Label
		, COUNT(*) ApprovedCount
	FROM Attendance.EngagementFlags c
	INNER JOIN Common.Users u ON c.UserId = u.Id
	WHERE 
		IIF(@startDate <= WeekOfDate AND DATEADD(DAY,-7,WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7,WeekOfDate)), 1, 0) = 1
		AND ApprovedStatus = 1
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = c.MentorId)
	GROUP BY c.GradeLevel
),
Rejected AS (
	SELECT
		COALESCE(d.GradeLevel,'None') Label
		, COUNT(*) RejectedCount
	FROM Attendance.EngagementFlags d
	INNER JOIN Common.Users u ON d.UserId = u.Id
	WHERE 
		IIF(@startDate <= WeekOfDate AND DATEADD(DAY,-7,WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7,WeekOfDate)), 1, 0) = 1
		AND ApprovedStatus = 0
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = d.MentorId)
	GROUP BY d.GradeLevel
)

SELECT
	COALESCE(a.GradeLevel,'None') Label
	, OutstandingCount
	, ApprovedCount
	, RejectedCount
FROM Attendance.EngagementFlags a
	INNER JOIN Common.Users u ON a.UserId = u.Id
	LEFT JOIN Outstanding b ON b.Label = COALESCE(a.GradeLevel,'None')
	LEFT JOIN Approved c ON c.Label = COALESCE(a.GradeLevel,'None')
	LEFT JOIN Rejected d ON d.Label = COALESCE(a.GradeLevel,'None')
WHERE IIF(@startDate <= WeekOfDate AND DATEADD(DAY,-7,WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7,WeekOfDate)), 1, 0) = 1
	AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
	AND (@mentorFilter = -1 OR @mentorFilter = a.MentorId)
GROUP BY a.GradeLevel, b.OutstandingCount, c.ApprovedCount, d.RejectedCount
ORDER BY CAST(ISNULL(NULLIF(a.GradeLevel, 'K'), 0) AS INT)