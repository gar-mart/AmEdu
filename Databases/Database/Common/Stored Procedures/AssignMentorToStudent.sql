CREATE PROCEDURE Common.AssignMentorToStudent(
	@studentId INT
	, @mentorId INT
)
AS
SET NOCOUNT ON

UPDATE Common.Users
SET MentorId = @mentorId
WHERE Id = @studentId
