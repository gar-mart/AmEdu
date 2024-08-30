CREATE PROCEDURE Orientation.ReturnUserQuizAnswers(
	@userId INT
	, @stepId INT
)
AS
SET NOCOUNT ON

-- RS1 - Questions
SELECT
	Id
	, QuestionText
FROM Orientation.Questions
WHERE StepId = @stepId
ORDER BY OrderBy

-- RS2 - Answers
SELECT
	c.Id QuestionId
	, a.Id 
	, a.AnswerText
	, a.IsCorrectAnswer
	, IIF(b.AnswerId > 0, 1, 0) IsUserAnswer
FROM Orientation.QuestionAnswers a
LEFT JOIN Orientation.UserAnswers b ON a.QuestionId = b.QuestionId AND a.Id = b.AnswerId AND b.UserId = @userId
INNER JOIN Orientation.Questions c ON a.QuestionId = c.Id
WHERE c.StepId = @stepId
ORDER BY a.OrderBy
