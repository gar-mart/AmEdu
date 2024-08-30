CREATE TYPE Tvp.QuizContent AS TABLE (
	QuizContentId INT -- if QuestionId and AnswerId are both null, then this is a quiz
	, QuestionId INT -- if only AnswerId is null, then this is a question
	, AnswerId INT -- if no Ids are null, then this is an answer
	, Text NVARCHAR(MAX)
	, OrderBy INT NOT NULL
	-- Applicable to Answers only
	, IsCorrectAnswer BIT 
)
