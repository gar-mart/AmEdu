CREATE PROCEDURE Attendance.ReturnClassUsers(
	@classId INT
	, @date DATE
)
AS
SET NOCOUNT ON

DECLARE @IntegrityPointType TINYINT = 2
	, @StewardshipPointType TINYINT = 3
	, @RespectPointType TINYINT = 6
	, @EngagementPointType TINYINT = 7

SELECT
	a.UserId
	, b.LastName + ', ' + b.FirstName Name
	, b.FirstName
	, b.LastName
	, IIF(c.Date IS NOT NULL, 1, 0) HasLiveLessonPoint
	, d.IntegrityPoints
	, e.StewardshipPoints
	, f.RespectPoints
	, g.EngagementPoints
	, h.Type Tardiness
	, h.Comment TardinessComment
	, a.Status
	, a.AsOfDate
	, i.Reason AbsenceReason
	, i.StartDate AbsenceStartDate
	, i.EndDate AbsenceEndDate
	, i.Id AbsenceId
FROM Attendance.ClassUsers a
INNER JOIN Attendance.vwClasses Classes ON a.ClassId = Classes.Id
INNER JOIN Common.vwUsers b ON a.UserId = b.Id AND b.IsActive = 1 AND b.IsStaff = 0
LEFT JOIN Attendance.LiveLessonPoints c ON b.Id = c.UserId AND c.ClassId = @classId AND c.Date = @date
OUTER APPLY (SELECT SUM(Value) IntegrityPoints FROM Attendance.Points d WHERE b.Id = d.UserId AND CAST(d.Date AS DATE) = @date AND d.Type = @IntegrityPointType) d
OUTER APPLY (SELECT SUM(Value) StewardshipPoints FROM Attendance.Points e WHERE b.Id = e.UserId AND CAST(e.Date AS DATE) = @date AND e.Type = @StewardshipPointType) e
OUTER APPLY (SELECT SUM(Value) RespectPoints FROM Attendance.Points f WHERE b.Id = f.UserId AND CAST(f.Date AS DATE) = @date AND f.Type = @RespectPointType) f
OUTER APPLY (SELECT SUM(Value) EngagementPoints FROM Attendance.Points g WHERE b.Id = g.UserId AND CAST(g.Date AS DATE) = @date AND g.Type = @EngagementPointType) g
LEFT JOIN Attendance.Tardies h ON h.ClassId = @classId AND h.Date = @date AND h.UserId = a.UserId
OUTER APPLY (SELECT TOP 1 Reason, StartDate, EndDate, Id FROM Attendance.Absences i WHERE i.UserId = a.UserId AND @date BETWEEN i.StartDate AND i.EndDate) i
WHERE 
	a.ClassId = @classId
	AND a.IsDeleted = 0
	AND CAST(ISNULL(a.StartDate, @date) AS DATE) <= @date 
	AND CAST(ISNULL(a.EndDate, @date) AS DATE) >= @date
ORDER BY
	b.LastName
	, b.FirstName