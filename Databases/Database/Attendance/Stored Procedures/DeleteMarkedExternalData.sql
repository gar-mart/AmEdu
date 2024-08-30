CREATE PROCEDURE Attendance.DeleteMarkedExternalData (
	@apiType TINYINT -- 1: Connexus, 2: Lincoln Learning, 3: Flex Point
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

		UPDATE Attendance.Classes SET
			IsDeleted = 1
		WHERE MarkedForDelete = 1
			AND (
				@apiType = 1 AND ConnexusId IS NOT NULL
				OR @apiType = 2 AND LincolnLearningId IS NOT NULL
				OR @apiType = 3 AND FlexPointId IS NOT NULL
			)

		UPDATE Attendance.ClassUsers SET
			IsDeleted = 1			
		WHERE MarkedForDelete = 1
			AND (
				@apiType = 1 AND ConnexusId > 0
				OR @apiType = 2 AND LincolnLearningId > 0 
				OR @apiType = 3 AND FlexPointId > 0 
			)

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH