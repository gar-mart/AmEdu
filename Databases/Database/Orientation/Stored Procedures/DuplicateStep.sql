CREATE PROCEDURE Orientation.DuplicateStep (
	@id INT
)
AS
SET NOCOUNT ON

DECLARE @NewId INT = (SELECT MAX(Id) + 1 FROM Orientation.Steps)
DECLARE @OrderBy INT = (SELECT OrderBy + 1 FROM Orientation.Steps WHERE Id = @id)

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	-- shift steps by one to accomodate new slide
	UPDATE Orientation.Steps SET
		OrderBy = OrderBy + 1
	WHERE OrderBy >= @OrderBy

	INSERT INTO Orientation.Steps (Id, Name, OrderBy, ContentFileName, ExpirationDate)
	SELECT 
		@NewId
		, Name
		, @OrderBy
		, ContentFileName
		, ExpirationDate
	FROM Orientation.Steps
	WHERE Id = @id

	INSERT INTO Orientation.StepGradeLevel (StepId, GradeLevel)
	SELECT @NewId, GradeLevel
	FROM Orientation.StepGradeLevel
	WHERE StepId = @id

	-- YouTubeVideoContent
	INSERT INTO Orientation.YouTubeVideoContent (StepId, OrderBy, VideoId)
	SELECT @NewId, OrderBy, VideoId
	FROM Orientation.YouTubeVideoContent 
	WHERE StepId = @id

	-- SystemContent
	INSERT INTO Orientation.SystemContent (StepId, OrderBy, ComponentId)
	SELECT @NewId, OrderBy, ComponentId
	FROM Orientation.SystemContent
	WHERE StepId = @id

	-- ShortcutsContent
	INSERT INTO Orientation.AppTileMetadataContent (StepId, OrderBy, AppTileMetadataId)
	SELECT @NewId, OrderBy, AppTileMetadataId
	FROM Orientation.AppTileMetadataContent 
	WHERE StepId = @id

	-- ResourcesContent
	INSERT INTO Orientation.StudentResourceContent (StepId, OrderBy, StudentResourceId)
	SELECT @NewId, OrderBy, StudentResourceId
	FROM Orientation.StudentResourceContent 
	WHERE StepId = @id

	-- ContactContent
	INSERT INTO Orientation.ContactContent(StepId, OrderBy, UserId)
	SELECT @NewId, OrderBy, UserId
	FROM Orientation.ContactContent 
	WHERE StepId = @id

	-- TextImageContent
	INSERT INTO Orientation.TextImageContent (StepId, OrderBy, Content)
	SELECT @NewId, OrderBy, Content
	FROM Orientation.TextImageContent
	WHERE StepId = @id

	-- SignatureContent
	INSERT INTO Orientation.SignatureContent(StepId, OrderBy, Signer, Disclaimer)
	SELECT @NewId, OrderBy, Signer, Disclaimer
	FROM Orientation.SignatureContent 
	WHERE StepId = @id

	-- Quiz Content
	INSERT INTO Orientation.QuizContent (StepId, OrderBy) 
	SELECT @NewId, OrderBy
	FROM Orientation.QuizContent
	WHERE StepId = @id

	DECLARE @QuizContentMap TABLE (DuplicatedFromId INT, NewId INT)
	INSERT INTO @QuizContentMap 
	SELECT DuplicatedQuizContent.Id, NewQuizContent.Id
	FROM Orientation.QuizContent DuplicatedQuizContent
	INNER JOIN Orientation.QuizContent NewQuizContent ON DuplicatedQuizContent.OrderBy = NewQuizContent.OrderBy
	WHERE DuplicatedQuizContent.StepId = @id
		AND NewQuizContent.StepId = @NewId

	-- Quiz Content: Questions
	INSERT INTO Orientation.Questions (OrderBy, QuestionText, QuizContentId)
	SELECT Questions.OrderBy, Questions.QuestionText, QuizContent.NewId
	FROM @QuizContentMap QuizContent
	INNER JOIN Orientation.Questions ON QuizContent.DuplicatedFromId = Questions.QuizContentId

	DECLARE @QuestionMap TABLE (DuplicatedFromId INT, NewId INT)
	INSERT INTO @QuestionMap 
	SELECT DuplicatedQuestions.Id, NewQuestions.Id
	FROM @QuizContentMap QuizContent
	INNER JOIN Orientation.Questions DuplicatedQuestions ON DuplicatedQuestions.QuizContentId = QuizContent.DuplicatedFromId
	INNER JOIN Orientation.Questions NewQuestions ON DuplicatedQuestions.OrderBy = NewQuestions.OrderBy AND NewQuestions.QuizContentId = QuizContent.NewId

	-- Quiz Content: Answers
	INSERT INTO Orientation.QuestionAnswers (QuestionId, AnswerText, OrderBy, IsCorrectAnswer)
	SELECT Questions.NewId, QuestionAnswers.AnswerText, QuestionAnswers.OrderBy, QuestionAnswers.IsCorrectAnswer
	FROM Orientation.QuestionAnswers
	INNER JOIN @QuestionMap Questions ON QuestionAnswers.QuestionId = Questions.DuplicatedFromId

	SELECT	
		Steps.Id
		, Steps.Name
		, Steps.OrderBy
		, Steps.ContentFileName
	FROM Orientation.Steps
	WHERE Id = @NewId

	SELECT 
		StepId
		, GradeLevel
	FROM Orientation.StepGradeLevel
	WHERE StepId = @NewId

	COMMIT TRANSACTION
END TRY
BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH

