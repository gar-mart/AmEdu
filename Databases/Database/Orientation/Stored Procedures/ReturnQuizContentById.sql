CREATE PROCEDURE Orientation.ReturnQuizContentById (
	@id INT
	, @userId INT = NULL -- if supplied, the proc will check if the user selected any of the answers
)
AS
SET NOCOUNT ON

-- Questions
SELECT	
	Id
	, OrderBy
	, QuestionText
	, QuizContentId
FROM Orientation.Questions
WHERE QuizContentId = @id
ORDER BY OrderBy

-- Answers
SELECT
	AnswerText
	, Id
	, IsCorrectAnswer
	, OrderBy
	, QuestionId
	, IsUserAnswer = IIF(
		EXISTS (
			SELECT * 
			FROM Orientation.UserAnswers 
			WHERE UserId = @userId 
				AND AnswerId = QuestionAnswers.Id
		), 1, 0)
FROM Orientation.QuestionAnswers
WHERE QuestionId IN (
	SELECT Id
	FROM Orientation.Questions
	WHERE QuizContentId = @id
)
ORDER BY OrderBy