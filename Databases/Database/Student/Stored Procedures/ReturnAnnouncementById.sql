CREATE PROCEDURE Student.ReturnAnnouncementById (
	@id INT
)
AS
SET NOCOUNT ON

SELECT 
	a.Body
	, a.ClassId
	, a.EndDate
	, a.Id
	, a.Path
	, a.StartDate
	, a.Title
FROM Staff.Announcements a
WHERE a.Id = @id