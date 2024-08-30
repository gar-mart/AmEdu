CREATE PROCEDURE Attendance.ReturnFlagResponsesReportByMentor (
	@startDate Date
	, @endDate Date
	, @schoolFilter NVARCHAR(50)
	, @mentorFilter INT
)
AS
SET NOCOUNT ON

;WITH Outstanding AS (
	SELECT
		bu.Name Label
		, bu.Id
		, COUNT(*) OutstandingCount
	FROM Attendance.EngagementFlags b
	INNER JOIN Common.Users bu on b.MentorId = bu.Id
	INNER JOIN Common.Users u ON b.UserId = u.Id
	WHERE 
		IIF(@startDate <= WeekOfDate AND DATEADD(DAY,-7,WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7,WeekOfDate)), 1, 0) = 1
		AND ApprovedStatus IS NULL
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = b.MentorId)
	GROUP BY bu.Id, bu.Name
),
Approved AS (
SELECT
		cu.Name Label
		, cu.Id
		, COUNT(*) ApprovedCount
	FROM Attendance.EngagementFlags c
	INNER JOIN Common.Users cu on c.MentorId = cu.Id
	INNER JOIN Common.Users u ON c.UserId = u.Id
	WHERE 
		IIF(@startDate <= WeekOfDate AND DATEADD(DAY,-7,WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7,WeekOfDate)), 1, 0) = 1
		AND ApprovedStatus = 1
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = c.MentorId)
	GROUP BY cu.Id, cu.Name
),
Rejected AS (
	SELECT
		du.Name Label
		, du.Id
		, COUNT(*) RejectedCount
	FROM Attendance.EngagementFlags d
	INNER JOIN Common.Users du on d.MentorId = du.Id
	INNER JOIN Common.Users u ON d.UserId = u.Id
	WHERE 
		IIF(@startDate <= WeekOfDate AND DATEADD(DAY,-7,WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7,WeekOfDate)), 1, 0) = 1
		AND RejectedReason IS NOT NULL
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = d.MentorId)
	GROUP BY du.Id, du.Name
)

SELECT
	u.Name Label
	, OutstandingCount
	, ApprovedCount
	, RejectedCount
FROM Attendance.EngagementFlags a
INNER JOIN Common.Users u on a.MentorId = u.Id
INNER JOIN Common.Users uu ON a.UserId = uu.Id
LEFT JOIN Outstanding b ON b.Id = a.MentorId
LEFT JOIN Approved c ON c.Id = a.MentorId
LEFT JOIN Rejected d ON d.Id = a.MentorId
WHERE IIF(@startDate <= WeekOfDate AND DATEADD(DAY,-7,WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7,WeekOfDate)), 1, 0) = 1
	AND (@schoolFilter = 'All' OR uu.Email LIKE '%' + @schoolFilter + '%'  )
	AND (@mentorFilter = -1 OR @mentorFilter = a.MentorId)
GROUP BY u.Name, b.OutstandingCount, c.ApprovedCount, d.RejectedCount
ORDER BY u.Name