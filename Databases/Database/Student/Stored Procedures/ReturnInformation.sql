CREATE PROCEDURE Student.ReturnInformation (
	@guardianIsSubscribedToWeeklySnapshotEmail BIT = NULL
	, @isActive BIT = NULL
)
AS
SET NOCOUNT ON

SELECT 
	a.StudentId
	, a.StudentName
	, a.Notes
	, a.MentorEmail
	, a.GoogleId

	-- Guardian Contact Information
	, a.GuardianName
	, a.GuardianPhoneNumber
	, a.GuardianEmailAddress
	, a.BestTimeToReachGuardian
	, a.PreferredWayToContactGuardian
	, a.GuardianIsSubscribedToWeeklySnapshotEmail
	, a.SecondaryGuardianIsSubscribedToWeeklySnapshotEmail
	, a.GuardianRelationship

	-- Student Contact Information
	, a.StudentPhoneNumber
	, a.StudentEmailAddress
	, a.HomeAddress
	, a.City
	, a.[State]
	, a.ZipCode
	, a.NotesAboutMe
	, a.BestTimeToReachStudent
	, a.PreferredWayToContactStudent
	, a.StudentBirthday

	-- Secondary Guardian Contact Information
	, a.SecondaryGuardianName
	, a.SecondaryGuardianPhoneNumber
	, a.SecondaryGuardianEmailAddress
	, a.SecondaryGuardianRelationship
FROM Student.vwInformation a
WHERE IsActive = ISNULL(@isActive, a.IsActive)
	AND (
		@guardianIsSubscribedToWeeklySnapshotEmail IS NULL
		OR a.GuardianIsSubscribedToWeeklySnapshotEmail = 0 AND a.SecondaryGuardianIsSubscribedToWeeklySnapshotEmail = 0 AND @guardianIsSubscribedToWeeklySnapshotEmail = 0
		OR @guardianIsSubscribedToWeeklySnapshotEmail = 1
		AND (
			a.GuardianIsSubscribedToWeeklySnapshotEmail = 1
			AND ISNULL(a.GuardianEmailAddress, '') <> ''
			OR a.SecondaryGuardianIsSubscribedToWeeklySnapshotEmail = 1
			AND ISNULL(a.SecondaryGuardianEmailAddress, '') <> ''
		)
	)