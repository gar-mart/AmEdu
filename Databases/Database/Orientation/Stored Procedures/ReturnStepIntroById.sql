CREATE PROCEDURE Orientation.ReturnStepIntroById(
	@id INT
)
AS
SET NOCOUNT ON
	
SELECT	
	b.MentorId
	, ISNULL(b.Link, 'https://www.youtube.com/embed/ryBKzQFVzDw') Link
FROM Common.Users a
LEFT JOIN Orientation.IntroVideos b ON a.MentorId = b.MentorId
WHERE a.Id = @id