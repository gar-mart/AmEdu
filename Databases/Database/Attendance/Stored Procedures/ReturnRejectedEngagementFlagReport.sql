CREATE PROCEDURE Attendance.ReturnRejectedEngagementFlagReport (
	@startDate Date
	, @endDate Date
)
AS
SET NOCOUNT ON

SELECT
	a.Name StudentName
	, a.Email StudentEmail
	, b.GradeLevel
	, c.Name MentorName
	, b.WeekOfDate
	, b.RejectedReason
FROM Common.Users a
INNER JOIN Attendance.EngagementFlags b ON a.Id = b.UserId
LEFT JOIN  Common.Users c ON b.MentorId = c.Id
WHERE 
	IIF(@startDate <= b.WeekOfDate AND DATEADD(DAY,-7,b.WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7,b.WeekOfDate)), 1, 0) = 1
	AND b.ApprovedStatus = 0
ORDER BY a.Name