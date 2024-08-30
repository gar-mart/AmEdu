CREATE PROCEDURE Staff.ReplaceAnnouncements (
	@connexusClassId BIGINT
	, @lincolnLearningId BIGINT
	, @flexPointId BIGINT
	, @announcements Tvp.Announcements READONLY
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

		DECLARE @classId INT = (
			SELECT Id
			FROM Attendance.vwClasses 
			WHERE ConnexusId = @connexusClassId
				OR LincolnLearningId = @lincolnLearningId
				OR FlexPointId = @flexPointId
		)

		IF @classId IS NOT NULL
		BEGIN
			DELETE Staff.Announcements
			WHERE ClassId = @classId
				AND Path NOT IN (
					SELECT Path
					FROM @announcements
				)

			INSERT INTO Staff.Announcements (Body, ClassId, EndDate, StartDate, Title, Path) 
			SELECT
				Body
				, @classId
				, EndDate
				, StartDate
				, Title
				, Path
			FROM @announcements
			WHERE Path NOT IN (SELECT Path FROM Staff.Announcements)
		END	

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH
