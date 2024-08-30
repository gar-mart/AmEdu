CREATE PROCEDURE Common.SetStudentGrade(
	@userId INT
	, @gradeLevel VARCHAR(10)
	, @mentorId INT OUTPUT
)
AS
SET NOCOUNT ON

DECLARE
	@CurrentGrade VARCHAR(10)
	, @CurrentMentorId INT

DECLARE @NewMentor TABLE(MentorId INT)

SELECT
	@CurrentGrade = GradeLevel
	, @CurrentMentorId = MentorId
FROM Common.Users
WHERE Id = @userId

UPDATE Common.Users
SET GradeLevel = @gradeLevel
WHERE Id = @userId

-- Set mentor only if no current mentor. New mentor must have an active account
IF @CurrentMentorId IS NULL 
	WITH Mentor AS (
		SELECT TOP 1 m.UserId
		FROM Common.Mentors m
		INNER JOIN Common.Users u ON m.UserId = u.Id
		CROSS APPLY (
			SELECT IIF(m.UserId = @CurrentMentorId, -1, SUM(CAST(b.IsActive AS INT))) ActiveStudentCount
			FROM Common.Users b
			WHERE m.UserId = b.MentorId
		) s
		WHERE m.GradeLevel = @gradeLevel
			AND u.IsActive = 1
		ORDER BY s.ActiveStudentCount
	)
	UPDATE u
	SET MentorId = m.UserId
	OUTPUT INSERTED.MentorId INTO @NewMentor(MentorId)
	FROM Common.Users u
	CROSS JOIN Mentor m
	WHERE u.Id = @userId


SET @mentorId = ISNULL((SELECT MentorId FROM @NewMentor), @CurrentMentorId)
