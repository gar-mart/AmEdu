CREATE PROCEDURE Attendance.ReturnFlagResponsesReportByCell (
	@startDate Date
	, @endDate Date
	, @schoolFilter NVARCHAR(50)
	, @mentorFilter INT
)
AS
SET NOCOUNT ON

;WITH Outstanding AS (
	SELECT
		(CASE WHEN b.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN b.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END) Label
		, COUNT(*) OutstandingCount
	FROM Attendance.EngagementFlags b
	INNER JOIN Common.Users u ON b.UserId = u.Id
	WHERE 
		IIF(@startDate <= WeekOfDate AND DATEADD(DAY,-7,WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7,WeekOfDate)), 1, 0) = 1
		AND ApprovedStatus IS NULL
		AND b.GradeLevel IS NOT NULL
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = b.MentorId)
	GROUP BY (CASE WHEN b.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN b.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END)
),
Approved AS (
SELECT
		(CASE WHEN c.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN c.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END) Label
		, COUNT(*) ApprovedCount
	FROM Attendance.EngagementFlags c
	INNER JOIN Common.Users u ON c.UserId = u.Id
	WHERE 
		IIF(@startDate <= WeekOfDate AND DATEADD(DAY,-7,WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7,WeekOfDate)), 1, 0) = 1
		AND ApprovedStatus = 1
		AND c.GradeLevel IS NOT NULL
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = c.MentorId)
	GROUP BY (CASE WHEN c.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN c.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END)
),
Rejected AS (
	SELECT
		(CASE WHEN d.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN d.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END) Label
		, COUNT(*) RejectedCount
	FROM Attendance.EngagementFlags d
	INNER JOIN Common.Users u ON d.UserId = u.Id
	WHERE 
		IIF(@startDate <= WeekOfDate AND dateadd(day,-7,WeekOfDate) <= ISNULL(@endDate, dateadd(day,-7,WeekOfDate)), 1, 0) = 1
		AND RejectedReason IS NOT NULL
		AND d.GradeLevel IS NOT NULL
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = d.MentorId)
	GROUP BY (CASE WHEN d.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN d.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END)
)

SELECT
	Label.Label
	, OutstandingCount
	, ApprovedCount
	, RejectedCount
FROM Attendance.EngagementFlags a
LEFT JOIN Outstanding b ON b.Label = (CASE WHEN a.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN a.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END)
LEFT JOIN Approved c ON c.Label = (CASE WHEN a.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN a.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END)
LEFT JOIN Rejected d ON d.Label =(CASE WHEN a.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN a.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END)
CROSS APPLY (
	SELECT CASE 
		WHEN a.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' 
		WHEN a.GradeLevel IN ('6', '7', '8') THEN '6-8' 
		ELSE '9-12' 
	 END Label
) Label
WHERE IIF(@startDate <= WeekOfDate AND dateadd(day,-7,WeekOfDate) <= ISNULL(@endDate, dateadd(day,-7,WeekOfDate)), 1, 0) = 1
	  AND a.GradeLevel IS NOT NULL
GROUP BY Label.Label
	, b.OutstandingCount
	, c.ApprovedCount
	, d.RejectedCount
ORDER BY 
  CASE 
	WHEN Label.Label = 'K-5' THEN 1
	WHEN Label.Label = '6-8' THEN 2
	ELSE 3 
 END