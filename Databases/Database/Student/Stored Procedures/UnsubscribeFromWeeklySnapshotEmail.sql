CREATE PROCEDURE Student.UnsubscribeFromWeeklySnapshotEmail (
	@studentGoogleId NVARCHAR(100)
)
AS
SET NOCOUNT ON

DECLARE @successful BIT = 0

UPDATE b SET
	b.GuardianIsSubscribedToWeeklySnapshotEmail = 0
	, @successful = 1
FROM Common.Users a
INNER JOIN Orientation.Step_ConnectionSurvey b ON a.Id = b.UserId
WHERE a.GoogleId = @studentGoogleId
	AND b.GuardianIsSubscribedToWeeklySnapshotEmail = 1

UPDATE b SET
	b.GuardianIsSubscribedToWeeklySnapshotEmail = 0
	, @successful = 1
FROM Common.Users a
INNER JOIN Student.Information b ON a.Id = b.StudentId
WHERE a.GoogleId = @studentGoogleId
	AND b.GuardianIsSubscribedToWeeklySnapshotEmail = 1

IF @successful = 0
	RETURN -1 