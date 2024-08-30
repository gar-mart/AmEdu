CREATE PROCEDURE Common.AssignSecondaryMentorToStudent(
	@studentId INT
	, @mentorId INT
)
AS
SET NOCOUNT ON

UPDATE Common.Users
SET SecondaryMentorId = @mentorId
WHERE Id = @studentId