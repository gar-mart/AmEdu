CREATE PROCEDURE Orientation.DeleteElective (
	@id INT
)
AS
SET NOCOUNT ON 

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

		DELETE FROM Orientation.Step_UserElectives
		WHERE ElectiveId = @id

		DELETE FROM Orientation.SemesterElectives
		WHERE ElectiveId = @id

		DELETE FROM Orientation.Electives
		WHERE Id = @id

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH
GO
