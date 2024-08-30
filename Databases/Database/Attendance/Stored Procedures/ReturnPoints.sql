CREATE PROCEDURE Attendance.ReturnPoints (
	@userId INT
	, @startDate DATE
	, @endDate DATE
)
AS
SET NOCOUNT ON

SELECT
	a.Id
	, a.Date Date
	, a.Type
	, a.Value
	, a.StaffId
	, a.Comments
	, b.Name StaffName
FROM Attendance.Points a
LEFT JOIN Common.Users b ON a.StaffId = b.Id
WHERE
	a.UserId = @userId
	AND (@startDate <= a.Date OR @startDate IS NULL)
	AND (a.Date <= DATEADD(DAY, 1, @endDate) OR @endDate IS NULL)
ORDER BY
	a.CreatedDate DESC