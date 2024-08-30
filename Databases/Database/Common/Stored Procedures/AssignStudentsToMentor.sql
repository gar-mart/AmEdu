CREATE PROCEDURE Common.AssignStudentsToMentor(
	@mentorId INT
	, @studentList Tvp.IdList READONLY

)
AS
SET NOCOUNT ON

UPDATE a
SET MentorId = @mentorId
FROM Common.Users a
INNER JOIN @studentList b ON a.Id = b.Id

