CREATE PROCEDURE Student.ReturnAnnouncements (
	@currentUserId INT
	, @currentDateTime DATETIME2(0)
)
AS
SET NOCOUNT ON
	
SELECT 
	a.ClassId
	, a.EndDate
	, a.Id
	, a.StartDate
	, a.Title
	, a.Path
	, IIF(b.UserId IS NULL, 0, 1) IsRead
FROM Staff.Announcements a
LEFT JOIN Student.AnnouncementsRead b ON a.Id = b.AnnouncementId AND @currentUserId = b.UserId
INNER JOIN Attendance.vwClasses c ON a.ClassId = c.Id
WHERE
	a.StartDate <= @currentDateTime
	AND ISNULL(a.EndDate, @currentDateTime) >= @currentDateTime
	AND c.StartDate <= @currentDateTime
	AND ISNULL(c.EndDate, @currentDateTime) >= @currentDateTime
	AND (
		EXISTS (
			SELECT *
			FROM Attendance.vwClassUsers b
			WHERE a.ClassId = b.ClassId
				AND b.UserId = @currentUserId
				AND b.IsDeleted = 0
				AND ISNULL(b.StartDate, @currentDateTime) <= @currentDateTime
				AND ISNULL(b.EndDate, @currentDateTime) >= @currentDateTime
				AND b.Status = 1 -- Active
		)
	)
ORDER BY a.StartDate DESC