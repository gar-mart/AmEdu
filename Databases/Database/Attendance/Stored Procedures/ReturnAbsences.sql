CREATE PROCEDURE Attendance.ReturnAbsences (
	@userId INT  --student Id
	, @startDate DATE
	, @endDate DATE
)
AS
SET NOCOUNT ON

SELECT
   a.Id
	, a.UserId
	, a.StartDate
	, a.EndDate
	, a.Reason
	, a.CreatedByUserId
	, a.CreatedDate
	, b.Name UserName
FROM Attendance.Absences a
INNER JOIN Common.Users b ON a.CreatedByUserId = b.Id
WHERE
	a.UserId = @userId
	AND IIF(a.StartDate <= @endDate AND @startDate <= ISNULL(a.EndDate, @startDate), 1, 0) = 1
ORDER BY
	a.StartDate