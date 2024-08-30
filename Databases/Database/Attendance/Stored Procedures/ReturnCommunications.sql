CREATE PROCEDURE Attendance.ReturnCommunications (
	@userId INT  --student Id
	, @startDate DATE
	, @endDate DATE
)
AS
SET NOCOUNT ON

SELECT
	a.Id
	, a.StaffId
	, b.Name
	, a.Date
	, a.Type
	, a.Notes
	, a.WasSuccessful
	, a.AwardPoint
FROM Attendance.Communications a
LEFT JOIN Common.Users b ON a.StaffId = b.Id
WHERE
	a.UserId = @userId
	AND a.Date BETWEEN @startDate AND @endDate
ORDER BY
	a.Date DESC