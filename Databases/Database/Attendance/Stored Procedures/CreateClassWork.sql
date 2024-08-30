CREATE PROCEDURE Attendance.CreateClassWork (
	@classConnexusId BIGINT
	, @classLincolnLearningId BIGINT
	, @classFlexPointId BIGINT
	, @classWork Tvp.ClassWork READONLY
	, @classUserWork Tvp.ClassUserWork READONLY
)
AS
SET NOCOUNT ON

DECLARE @ClassId INT = (
	SELECT TOP 1 Id
	FROM Attendance.Classes
	WHERE @classConnexusId IS NOT NULL
		AND ConnexusId = @classConnexusId 
		OR @classLincolnLearningId IS NOT NULL 
		AND LincolnLearningId = @classLincolnLearningId
		OR @classFlexPointId IS NOT NULL 
		AND FlexPointId = @classFlexPointId
)

IF @ClassId > 0
BEGIN
	BEGIN TRY
		SET XACT_ABORT ON
		BEGIN TRANSACTION

		-- Merge Attendance.ClassWork records
		; WITH TRG AS (
			SELECT * 
			FROM Attendance.ClassWork
			WHERE ClassId = @ClassId
		)
		MERGE TRG USING @classWork SRC ON TRG.ItemId = SRC.ItemId
		WHEN NOT MATCHED THEN INSERT (ClassId, ItemId, Title, Type, DueDate, DueDateGrace, Gradable, IsDeleted) VALUES (
			@ClassId
			, SRC.ItemId
			, SRC.Title
			, SRC.Type
			, SRC.DueDate
			, SRC.DueDateGrace
			, SRC.Gradable
			, 0
		)
		WHEN MATCHED THEN UPDATE SET
			Title = SRC.Title
			, Type = SRC.Type
			, DueDate = SRC.DueDate
			, DueDateGrace = SRC.DueDateGrace
			, Gradable = SRC.Gradable
			, IsDeleted = 0
		WHEN NOT MATCHED BY SOURCE THEN UPDATE SET IsDeleted = 1;

		-- Merge Attendance.ClassUserWork records
		; WITH TRG AS (
			SELECT * 
			FROM Attendance.ClassUserWork
			WHERE ClassId = @ClassId
		), SRC AS (
			SELECT 
				classUserWork.*
				, Users.Id UserId
			FROM @classUserWork classUserWork
			INNER JOIN Common.Users ON 
				classUserWork.UserConnexusId IS NOT NULL
				AND classUserWork.UserConnexusId = Users.ConnexusId
				OR classUserWork.UserLincolnLearningId IS NOT NULL
				AND classUserWork.UserLincolnLearningId = Users.LincolnLearningId
				OR classUserWork.UserFlexPointId IS NOT NULL
				AND classUserWork.UserFlexPointId = Users.FlexPointId
			WHERE EXISTS (
				SELECT * 
				FROM Attendance.ClassWork
				WHERE ClassWork.ClassId = @ClassId
					AND ClassWork.ItemId = classUserWork.ItemId
			)
		)
		MERGE TRG USING SRC ON 
			TRG.ItemId = SRC.ItemId 
			AND TRG.WorkId = SRC.WorkId
			AND TRG.UserId = SRC.UserId
			AND (
				TRG.ConnexusEnrollmentId = 0
				AND TRG.LincolnLearningEnrollmentId = 0
				AND TRG.FlexPointEnrollmentId = 0
				OR TRG.ConnexusEnrollmentId = SRC.ConnexusEnrollmentId
				AND TRG.LincolnLearningEnrollmentId = SRC.LincolnLearningEnrollmentId
				AND TRG.FlexPointEnrollmentId = SRC.FlexPointEnrollmentId
			)
		WHEN NOT MATCHED THEN INSERT (ClassId, ConnexusEnrollmentId, LincolnLearningEnrollmentId, FlexPointEnrollmentId, UserId, ItemId, WorkId, SubmittedDate, ScoredDate, PointsPossible, PointsAchieved, IsDeleted) VALUES (
			@ClassId
			, SRC.ConnexusEnrollmentId
			, SRC.LincolnLearningEnrollmentId
			, SRC.FlexPointEnrollmentId
			, SRC.UserId
			, SRC.ItemId
			, SRC.WorkId
			, SRC.SubmittedDate
			, SRC.ScoredDate
			, SRC.PointsPossible
			, SRC.PointsAchieved
			, 0
		)
		WHEN MATCHED THEN UPDATE SET 
			SubmittedDate = SRC.SubmittedDate
			, ConnexusEnrollmentId = SRC.ConnexusEnrollmentId
			, LincolnLearningEnrollmentId = SRC.LincolnLearningEnrollmentId
			, FlexPointEnrollmentId = SRC.FlexPointEnrollmentId
			, ScoredDate = SRC.ScoredDate
			, PointsPossible = SRC.PointsPossible
			, PointsAchieved = SRC.PointsAchieved
			, IsDeleted = 0
		WHEN NOT MATCHED BY SOURCE THEN UPDATE SET IsDeleted = 1;

		COMMIT TRANSACTION
	END TRY

	BEGIN CATCH
		IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END