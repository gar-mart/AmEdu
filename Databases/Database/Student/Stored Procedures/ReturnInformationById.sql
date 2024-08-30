CREATE PROCEDURE Student.ReturnInformationById (
	@studentId INT
)
AS
SET NOCOUNT ON
	
-- take staff updated values over orientation values
SELECT 
	a.StudentId
	, a.StudentName
	, a.Notes
	, a.MentorEmail

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
WHERE a.StudentId = @studentId