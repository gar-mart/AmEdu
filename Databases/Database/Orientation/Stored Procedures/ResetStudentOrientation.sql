CREATE PROCEDURE Orientation.ResetStudentOrientation (
	@userId INT = NULL
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION
		
	UPDATE Common.Users SET 
		OrientationStartTime = NULL
		, OrientationFinishTime = NULL
		, OrientationExpiredNotificationSent = 0
		, MentorId = NULL
		, SecondaryMentorId = NULL
	WHERE Id = ISNULL(@userId, Id)

	DELETE Orientation.CompletedSteps WHERE UserId = ISNULL(@userId, UserId)
	DELETE Orientation.Step_EmailVerification WHERE UserId = ISNULL(@userId, UserId)
	DELETE Orientation.Step_SendUsASelfie WHERE UserId = ISNULL(@userId, UserId)
	DELETE Orientation.UserAnswers WHERE UserId = ISNULL(@userId, UserId)

	-- returning students must re-confirm the connection survey results
	UPDATE Orientation.Step_ConnectionSurvey SET IsConfirmed = 0 WHERE UserId = ISNULL(@userId, UserId)
	-- returning students may not change their elective choices
	UPDATE Orientation.Step_UserElectives SET IsLockedIn = 1 WHERE UserId = ISNULL(@userId, UserId) 
	-- re-subscribe guardians to the weekly snapshot email
	UPDATE Orientation.Step_ConnectionSurvey SET GuardianIsSubscribedToWeeklySnapshotEmail = 1

	COMMIT TRANSACTION
END TRY
BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH