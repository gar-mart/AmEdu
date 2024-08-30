CREATE PROCEDURE Attendance.DeleteIntervention (
	@currentUserId INT
	, @id INT
)
AS
SET NOCOUNT ON

-- Determine the student first so that we can make the following checks
DECLARE @StudentId INT
	, @EngagementFlagId INT

SELECT 
	@StudentId = ef.UserId 
	, @EngagementFlagId = ef.Id
FROM Attendance.Interventions i
INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
WHERE @id = ef.UserId

IF NOT EXISTS (
	SELECT * 
	FROM Security.vwUserRoles ur
	WHERE ur.UserId = @currentUserId
		AND ur.RoleName IN ('Interventionist')
)
	RETURN 50401 -- user must be an interventionist to delete interventions

IF EXISTS (
	SELECT *
	FROM Attendance.Interventions i 
	INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
	WHERE ef.UserId = @StudentId
		AND i.LogOnly = 0
		AND i.Level > 0
)
	RETURN 2 -- warning interventions can only be deleted and only as long as no other interventions exist


BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION		

		DELETE Attendance.InterventionEmailCommunications
		WHERE InterventionId = @id

		DELETE Attendance.InterventionScheduledMeetings	
		WHERE InterventionId = @id

		DELETE Attendance.InterventionSuccessPlans
		WHERE InterventionId = @id

		DELETE Attendance.InterventionTruancyForms
		WHERE InterventionId = @id

		DELETE Attendance.Interventions
		WHERE Id = @id	

		UPDATE Attendance.EngagementFlags SET
			ApprovedStatus = NULL -- reset the engagement flag so that an intervention may be rejected or approved again
		WHERE Id = @EngagementFlagId

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH