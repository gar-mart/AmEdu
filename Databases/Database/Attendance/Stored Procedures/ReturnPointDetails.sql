-- Returns staff name, comments, value, and date for a specific point type and student for all time
CREATE PROCEDURE Attendance.ReturnPointDetails (
	@studentId INT
	, @pointsType TINYINT -- 1 communication, 2 integrity, 3 stewardship, 4 spend, 5 lesson, 6 respect, 7 engagement
)
AS
SET NOCOUNT ON

SELECT
	a.Date Date
	, a.Value
	, ISNULL(a.Comments, d.Name) Comments -- the class name is returned when the Point Type is Live Lessons (comments cannot be added to live lesson points)
	, b.Name StaffName
FROM Attendance.vwCurrentPoints a
LEFT JOIN Common.Users b ON a.StaffId = b.Id
LEFT JOIN Attendance.LiveLessonPoints c ON a.LiveLessonId = c.Id
LEFT JOIN Attendance.vwClasses d ON c.ClassId = d.Id
WHERE
	a.UserId = @studentId
	AND a.Type = @pointsType
ORDER BY
	a.Date DESC