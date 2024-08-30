CREATE PROCEDURE Orientation.SubmitUserAnswers(
	@userId INT
	, @answerList Tvp.QuestionAnswerList READONLY
)
AS
SET NOCOUNT ON

DECLARE @stepId INT = (
	SELECT TOP 1 ISNULL(b.StepId, c.StepId)
	FROM @answerList a
	INNER JOIN Orientation.Questions b ON a.QuestionId = b.Id
	LEFT JOIN Orientation.QuizContent c ON b.QuizContentId = c.Id
)

;WITH TRG AS (
	SELECT a.AnswerId
		, a.QuestionId
		, a.UserId
	FROM Orientation.UserAnswers a 
	WHERE UserId = @userId 
		AND EXISTS (
			SELECT * 
			FROM Orientation.Questions b 
			LEFT JOIN Orientation.QuizContent c ON b.QuizContentId = c.Id
			WHERE b.Id = a.QuestionId
				AND ( 
					b.StepId = @stepId
					OR c.StepId = @stepId
				)
		)
)
MERGE TRG
USING @answerList SRC on TRG.UserId = @userId AND TRG.QuestionId = SRC.QuestionId
WHEN MATCHED THEN UPDATE SET AnswerId = SRC.AnswerId
WHEN NOT MATCHED THEN INSERT(UserId, QuestionId, AnswerId) VALUES(@userId, SRC.QuestionId, SRC.AnswerId)
WHEN NOT MATCHED BY SOURCE THEN DELETE;

