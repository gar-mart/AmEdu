CREATE PROCEDURE Student.MarkAnnouncementRead (
	@currentUserId INT
	, @id INT
)
AS
SET NOCOUNT ON

INSERT INTO Student.AnnouncementsRead (AnnouncementId, UserId)
VALUES (@id, @currentUserId)
