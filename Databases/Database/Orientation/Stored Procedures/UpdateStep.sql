CREATE PROCEDURE Orientation.UpdateStep (
	@id INT
	, @name NVARCHAR(150)
	, @activateDate DATETIME2(0) 
	, @expirationDate DATETIME2(0) 
	, @grades Tvp.GradeLevelList READONLY
	, @youTubeVideoContent Tvp.YouTubeVideoContent READONLY
	, @systemContent Tvp.SystemContent READONLY
	, @appTileMetadataContent Tvp.AppTileMetadataContent READONLY
	, @studentResourceContent Tvp.StudentResourceContent READONLY
	, @contactContent Tvp.ContactContent READONLY
	, @textImageContent Tvp.TextImageContent READONLY
	, @signatureContent Tvp.SignatureContent READONLY
	, @quizContent Tvp.QuizContent READONLY
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	UPDATE Orientation.Steps SET
		Name = @name
		, ActivateDate = @activateDate
		, ExpirationDate = @expirationDate
	WHERE Id = @id
	
	;MERGE Orientation.StepGradeLevel USING @grades Grades ON StepGradeLevel.GradeLevel = Grades.GradeLevel AND StepGradeLevel.StepId = @id
	WHEN NOT MATCHED THEN INSERT (StepId, GradeLevel) VALUES (@id, Grades.GradeLevel)
	WHEN NOT MATCHED BY SOURCE AND StepId = @id THEN DELETE;

	-- YouTubeVideoContent
	; WITH Content AS (
		SELECT * 
		FROM @youTubeVideoContent
		WHERE VideoId IS NOT NULL
	)
	MERGE Orientation.YouTubeVideoContent USING Content ON YouTubeVideoContent.Id = Content.Id
	WHEN NOT MATCHED THEN INSERT (OrderBy, StepId, VideoId) VALUES (Content.OrderBy, @id, Content.VideoId)
	WHEN MATCHED THEN UPDATE SET 
		OrderBy = Content.OrderBy
		, VideoId = Content.VideoId
	WHEN NOT MATCHED BY SOURCE AND YouTubeVideoContent.StepId = @id THEN DELETE;

	-- SystemContent
	MERGE Orientation.SystemContent USING @systemContent Content ON SystemContent.Id = Content.Id
	WHEN NOT MATCHED THEN INSERT (OrderBy, StepId, ComponentId) VALUES (Content.OrderBy, @id, Content.ComponentId)
	WHEN MATCHED THEN UPDATE SET 
		OrderBy = Content.OrderBy
		, ComponentId = Content.ComponentId
	WHEN NOT MATCHED BY SOURCE AND SystemContent.StepId = @id THEN DELETE;

	-- ShortcutsContent
	; WITH Content AS (
		SELECT * 
		FROM @appTileMetadataContent
		WHERE AppTileMetadataId > 0
	)
	MERGE Orientation.AppTileMetadataContent USING Content ON AppTileMetadataContent.Id = Content.Id
	WHEN NOT MATCHED THEN INSERT (OrderBy, StepId, AppTileMetadataId) VALUES (Content.OrderBy, @id, Content.AppTileMetadataId)
	WHEN MATCHED THEN UPDATE SET 
		OrderBy = Content.OrderBy
		, AppTileMetadataId = Content.AppTileMetadataId
	WHEN NOT MATCHED BY SOURCE AND AppTileMetadataContent.StepId = @id THEN DELETE;

	-- ResourcesContent
	; WITH Content AS (
		SELECT * 
		FROM @studentResourceContent
		WHERE StudentResourceId > 0
	)
	MERGE Orientation.StudentResourceContent USING Content ON StudentResourceContent.Id = Content.Id
	WHEN NOT MATCHED THEN INSERT (OrderBy, StepId, StudentResourceId) VALUES (Content.OrderBy, @id, Content.StudentResourceId)
	WHEN MATCHED THEN UPDATE SET 
		OrderBy = Content.OrderBy
		, StudentResourceId = Content.StudentResourceId
	WHEN NOT MATCHED BY SOURCE AND StudentResourceContent.StepId = @id THEN DELETE;

	-- ContactContent
	; WITH Content AS (
		SELECT * 
		FROM @contactContent
		WHERE UserId > 0
	)
	MERGE Orientation.ContactContent USING Content ON ContactContent.Id = Content.Id
	WHEN NOT MATCHED THEN INSERT (OrderBy, StepId, UserId) VALUES (Content.OrderBy, @id, Content.UserId)
	WHEN MATCHED THEN UPDATE SET 
		OrderBy = Content.OrderBy
		, UserId = Content.UserId
	WHEN NOT MATCHED BY SOURCE AND ContactContent.StepId = @id THEN DELETE;

	-- TextImageContent
	MERGE Orientation.TextImageContent USING @textImageContent Content ON TextImageContent.Id = Content.Id
	WHEN NOT MATCHED THEN INSERT (OrderBy, StepId, Content) VALUES (Content.OrderBy, @id, Content.Content)
	WHEN MATCHED THEN UPDATE SET 
		OrderBy = Content.OrderBy
		, Content = Content.Content
	WHEN NOT MATCHED BY SOURCE AND TextImageContent.StepId = @id THEN DELETE;

	-- SignatureContent
	; WITH Content AS (
		SELECT * 
		FROM @signatureContent
		WHERE Signer IS NOT NULL
			AND Disclaimer IS NOT NULL
	)
	MERGE Orientation.SignatureContent USING Content ON SignatureContent.Id = Content.Id
	WHEN NOT MATCHED THEN INSERT (OrderBy, StepId, Signer, Disclaimer) VALUES (Content.OrderBy, @id, Content.Signer, Content.Disclaimer)
	WHEN MATCHED THEN UPDATE SET 
		OrderBy = Content.OrderBy
		, Signer = Content.Signer
		, Disclaimer = Content.Disclaimer
	WHEN NOT MATCHED BY SOURCE AND SignatureContent.StepId = @id THEN DELETE;

	-- Quiz Content
	; WITH Quizzes AS (
		SELECT *
		FROM @quizContent
		WHERE QuestionId IS NULL 
			AND AnswerId IS NULL
	)
	MERGE Orientation.QuizContent USING Quizzes ON
		QuizContent.Id = Quizzes.QuizContentId
	WHEN NOT MATCHED THEN INSERT (OrderBy, StepId) VALUES (Quizzes.OrderBy, @id)
	WHEN MATCHED THEN UPDATE SET OrderBy = Quizzes.OrderBy
	WHEN NOT MATCHED BY SOURCE AND QuizContent.StepId = @id THEN DELETE;
	
	DECLARE @InsertedQuizContent TABLE(Id INT, OrderBy INT)
	INSERT INTO @InsertedQuizContent 
	SELECT Id, OrderBy
	FROM Orientation.QuizContent	
	WHERE StepId = @id

	; WITH QuizQuestions AS (
		SELECT Questions.QuestionId
			, Questions.OrderBy
			, Questions.Text
			, QuizContentId = InsertedQuizContent.Id
		FROM @InsertedQuizContent InsertedQuizContent
		INNER JOIN @quizContent QuizContent ON 
			InsertedQuizContent.OrderBy = QuizContent.OrderBy 
			AND QuizContent.AnswerId   IS NULL
			AND QuizContent.QuestionId IS NULL
		INNER JOIN @quizContent Questions ON QuizContent.QuizContentId = Questions.QuizContentId
		WHERE Questions.QuestionId IS NOT NULL 
			AND Questions.AnswerId IS     NULL
	), Questions AS (
		SELECT *
		FROM Orientation.Questions
		WHERE QuizContentId IN (
			SELECT Id
			FROM Orientation.QuizContent
			WHERE StepId = @id
		)
	)
	MERGE Questions USING QuizQuestions ON 
		Questions.Id = QuizQuestions.QuestionId
		AND Questions.QuizContentId = QuizQuestions.QuizContentId
	WHEN NOT MATCHED THEN INSERT (QuizContentId, QuestionText, OrderBy) VALUES (
		QuizQuestions.QuizContentId
		, QuizQuestions.Text
		, QuizQuestions.OrderBy
	)
	WHEN MATCHED THEN UPDATE SET
		QuestionText = QuizQuestions.Text
		, OrderBy = QuizQuestions.OrderBy
	WHEN NOT MATCHED BY SOURCE THEN DELETE;

	DECLARE @InsertedQuestions TABLE (Id INT, OrderBy INT, QuizContentId INT)
	INSERT INTO @InsertedQuestions 
	SELECT Questions.Id, Questions.OrderBy, InsertedQuizContent.QuizContentId
	FROM Orientation.Questions
	INNER JOIN Orientation.QuizContent ON Questions.QuizContentId = QuizContent.Id
	INNER JOIN @quizContent InsertedQuizContent ON QuizContent.OrderBy = InsertedQuizContent.OrderBy AND InsertedQuizContent.QuestionId IS NULL
	WHERE Questions.QuizContentId IN (
		SELECT Id
		FROM Orientation.QuizContent
		WHERE QuizContent.StepId = @id
	)

	; WITH QuizAnswers AS (
		SELECT 
			Answers.AnswerId
			, Answers.IsCorrectAnswer
			, Answers.OrderBy
			, Answers.Text
			, QuestionId = InsertedQuestions.Id
		FROM @InsertedQuestions InsertedQuestions
		INNER JOIN @quizContent Questions ON 
			InsertedQuestions.OrderBy = Questions.OrderBy 
			AND InsertedQuestions.QuizContentId = Questions.QuizContentId
			AND Questions.QuestionId IS NOT NULL
			AND Questions.AnswerId IS       NULL 
		INNER JOIN @quizContent Answers ON Answers.QuestionId = Questions.QuestionId AND Answers.QuizContentId = Questions.QuizContentId
		WHERE Answers.AnswerId IS NOT NULL
	), Answers AS (
		SELECT * 
		FROM Orientation.QuestionAnswers
		WHERE QuestionId IN (
			SELECT Questions.Id
			FROM Orientation.Questions
			INNER JOIN Orientation.QuizContent ON QuizContentId = QuizContent.Id
			WHERE QuizContent.StepId = @id
		)
	)
	MERGE Answers USING QuizAnswers ON 
		Answers.Id = QuizAnswers.AnswerId
		AND Answers.QuestionId = QuizAnswers.QuestionId
	WHEN NOT MATCHED THEN INSERT (QuestionId, AnswerText, OrderBy, IsCorrectAnswer) VALUES (
		QuizAnswers.QuestionId
		, QuizAnswers.Text
		, QuizAnswers.OrderBy
		, QuizAnswers.IsCorrectAnswer
	)
	WHEN MATCHED THEN UPDATE SET
		AnswerText = QuizAnswers.Text
		, OrderBy = QuizAnswers.OrderBy
		, IsCorrectAnswer = QuizAnswers.IsCorrectAnswer
	WHEN NOT MATCHED BY SOURCE THEN DELETE;

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH
