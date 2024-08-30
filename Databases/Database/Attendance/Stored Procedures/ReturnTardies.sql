CREATE PROCEDURE Attendance.ReturnTardies (
	@userId INT
	, @startDate DATE
	, @endDate DATE
)
AS
SET NOCOUNT ON

SELECT 
	a.ClassId
	, a.Comment
	, a.CreatedDate
	, a.Date
	, a.StaffId
	, a.Type
	, a.UserId
	, b.Name StaffName
	, c.Name ClassName
	, d.Name UserName
FROM Attendance.Tardies a
INNER JOIN Common.Users b ON a.StaffId = b.Id
INNER JOIN Attendance.vwClasses c ON a.ClassId = c.Id
INNER JOIN Common.Users d ON a.UserId = d.Id
WHERE a.UserId = @userId
	AND a.Date BETWEEN @startDate AND @endDate
ORDER BY Date
