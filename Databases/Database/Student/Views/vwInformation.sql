CREATE VIEW Student.vwInformation
AS 
SELECT 
	a.Id StudentId
	, a.IsActive
	, a.GoogleId
	, a.Name StudentName
	, a.FirstName StudentFirstName
	, a.LastName StudentLastName
	, a.Email StudentSchoolEmailAddress
	, a.GradeLevel
	, b.SecondaryGuardianIsSubscribedToWeeklySnapshotEmail
	, a.MentorId
	, b.Notes
	, d.Email MentorEmail
	, d.Name MentorName
	, d.FirstName MentorFirstName
	, d.LastName MentorLastName

	-- Guardian Contact Information
	, ISNULL(b.GuardianName, c.GuardianName) GuardianName
	, ISNULL(b.GuardianPhoneNumber, c.GuardianPhoneNumber) GuardianPhoneNumber
	, ISNULL(b.GuardianEmailAddress, c.GuardianEmailAddress) GuardianEmailAddress
	, ISNULL(b.BestTimeToReachGuardian, c.BestTimeToReachAsGuardian) BestTimeToReachGuardian
	, ISNULL(b.PreferredWayToContactGuardian, c.WayToContactAsGuardian) PreferredWayToContactGuardian
	, ISNULL(b.GuardianIsSubscribedToWeeklySnapshotEmail, c.GuardianIsSubscribedToWeeklySnapshotEmail) GuardianIsSubscribedToWeeklySnapshotEmail
	, ISNULL(b.GuardianRelationship, c.GuardianRelationship) GuardianRelationship

	-- Student Contact Information
	, ISNULL(b.StudentPhoneNumber, c.StudentPhoneNumber) StudentPhoneNumber
	, ISNULL(b.StudentEmailAddress, c.StudentEmailAddress) StudentEmailAddress
	, ISNULL(b.HomeAddress, c.HomeAddress) HomeAddress
	, ISNULL(b.City, c.City) City
	, ISNULL(b.[State], c.[State]) [State]
	, ISNULL(b.ZipCode, c.ZipCode) ZipCode
	, ISNULL(b.NotesAboutMe, c.NotesAboutMe) NotesAboutMe
	, b.BestTimeToReachStudent
	, ISNULL(b.PreferredWayToContactStudent, c.WayToReachAsStudent) PreferredWayToContactStudent
	, ISNULL(b.StudentBirthday, c.StudentBirthday) StudentBirthday

	-- Secondary Guardian Contact Information
	, ISNULL(b.SecondaryGuardianName, c.SecondaryGuardianName) SecondaryGuardianName
	, ISNULL(b.SecondaryGuardianPhoneNumber, c.SecondaryGuardianPhoneNumber) SecondaryGuardianPhoneNumber
	, ISNULL(b.SecondaryGuardianEmailAddress, c.SecondaryGuardianEmailAddress) SecondaryGuardianEmailAddress
	, ISNULL(b.SecondaryGuardianRelationship, c.SecondaryGuardianRelationship) SecondaryGuardianRelationship
FROM Common.vwUsers a
LEFT JOIN Student.Information b ON a.Id = b.StudentId
LEFT JOIN Orientation.Step_ConnectionSurvey c ON a.Id = c.UserId
LEFT JOIN Common.Users d ON a.MentorId = d.Id
WHERE a.IsStaff = 0