CREATE PROCEDURE Orientation.DeleteStep (
	@id INT
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	DELETE Orientation.UserAnswers
	WHERE QuestionId IN (
		SELECT Id
		FROM Orientation.Questions
		WHERE StepId = @id
	)

	DELETE Orientation.QuestionAnswers 
	WHERE QuestionId IN (
		SELECT Id 
		FROM Orientation.Questions
		WHERE StepId = @id
	)

	DELETE Orientation.Questions
	WHERE StepId = @id

	DELETE Orientation.CompletedSteps
	WHERE StepId = @id

	DELETE Orientation.StepGradeLevel
	WHERE StepId = @id

	DELETE Orientation.Steps
	WHERE Id = @id

	COMMIT TRANSACTION
END TRY
BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH

