CREATE PROCEDURE Student.UpdateInformation (
	@studentId INT
	, @notes NVARCHAR(250)
	-- guardian contact information
	, @guardianName NVARCHAR(100)
	, @guardianEmailAddress NVARCHAR(320)
	, @preferredWayToContactGuardian INT
	, @bestTimeToReachGuardian INT
	, @guardianPhoneNumber NVARCHAR(20)
	, @guardianRelationship NVARCHAR(50)
	-- secondary guardian contact information
	, @secondaryGuardianName NVARCHAR(100)
	, @secondaryGuardianEmailAddress NVARCHAR(320)
	, @secondaryGuardianPhoneNumber NVARCHAR(20)
	, @secondaryGuardianRelationship NVARCHAR(50)
	-- student contact information
	, @homeAddress NVARCHAR(100)
	, @city NVARCHAR(60)
	, @state NVARCHAR(40)
	, @zipCode NVARCHAR(5)
	, @notesAboutMe NVARCHAR(1000)
	, @preferredWayToContactStudent INT
	, @bestTimeToReachStudent INT
	, @studentEmailAddress NVARCHAR(320)
	, @studentPhoneNumber NVARCHAR(20)
	, @guardianIsSubscribedToWeeklySnapshotEmail BIT
	, @secondaryGuardianIsSubscribedToWeeklySnapshotEmail BIT
	, @studentBirthday DATE
)
AS
SET NOCOUNT ON

-- force NULL to empty strings
SELECT 
	-- guardian contact information
	@guardianName = ISNULL(@guardianName, '')
	, @guardianEmailAddress = ISNULL(@guardianEmailAddress, '')
	, @guardianPhoneNumber = ISNULL(@guardianPhoneNumber, '')
	, @guardianRelationship = ISNULL(@guardianRelationship, '')
	-- secondary guardian contact information
	, @secondaryGuardianName = ISNULL(@secondaryGuardianName, '')
	, @secondaryGuardianEmailAddress = ISNULL(@secondaryGuardianEmailAddress, '')
	, @secondaryGuardianPhoneNumber = ISNULL(@secondaryGuardianPhoneNumber, '')
	, @secondaryGuardianRelationship = ISNULL(@secondaryGuardianRelationship, '')
	-- student contact information
	, @studentEmailAddress = ISNULL(@studentEmailAddress, '')
	, @studentPhoneNumber = ISNULL(@studentPhoneNumber, '')
	, @homeAddress = ISNULL(@homeAddress, '')
	, @city = ISNULL(@city, '')
	, @state = ISNULL(@state, '')
	, @zipCode = ISNULL(@zipCode, '')
	, @notesAboutMe = ISNULL(@notesAboutMe, '')

MERGE Student.Information TRG
USING (SELECT @studentId StudentId) SRC ON TRG.StudentId = SRC.StudentId
WHEN MATCHED THEN UPDATE SET
	Notes = @notes
	-- guardian contact information
	, GuardianName = @guardianName
	, PreferredWayToContactGuardian = @preferredWayToContactGuardian 
	, BestTimeToReachGuardian = @bestTimeToReachGuardian 
	, GuardianEmailAddress = @guardianEmailAddress 
	, GuardianPhoneNumber = @guardianPhoneNumber 
	, GuardianIsSubscribedToWeeklySnapshotEmail = @guardianIsSubscribedToWeeklySnapshotEmail
	, SecondaryGuardianIsSubscribedToWeeklySnapshotEmail = @secondaryGuardianIsSubscribedToWeeklySnapshotEmail
	, GuardianRelationship = @guardianRelationship
	-- secondary guardian contact information
	, SecondaryGuardianName = @secondaryGuardianName
	, SecondaryGuardianEmailAddress = @secondaryGuardianEmailAddress
	, SecondaryGuardianPhoneNumber = @secondaryGuardianPhoneNumber
	, SecondaryGuardianRelationship = @secondaryGuardianRelationship
	-- student contact information
	, HomeAddress = @homeAddress
	, City = @city
	, [State] = @state
	, ZipCode = @zipCode
	, NotesAboutMe = @notesAboutMe
	, PreferredWayToContactStudent = @preferredWayToContactStudent 
	, BestTimeToReachStudent = @bestTimeToReachStudent 
	, StudentEmailAddress = @studentEmailAddress 
	, StudentPhoneNumber = @studentPhoneNumber 
	, StudentBirthday = @studentBirthday
WHEN NOT MATCHED THEN INSERT (
	StudentId
	, Notes
	-- guardian contact information
	, GuardianName 
	, PreferredWayToContactGuardian  
	, BestTimeToReachGuardian  
	, GuardianEmailAddress  
	, GuardianPhoneNumber  
	, GuardianIsSubscribedToWeeklySnapshotEmail
	, GuardianRelationship
	-- secondary guardian contact information
	, SecondaryGuardianName
	, SecondaryGuardianEmailAddress 
	, SecondaryGuardianPhoneNumber 
	, SecondaryGuardianRelationship
	-- student contact information
	, HomeAddress
	, City
	, [State]
	, ZipCode
	, NotesAboutMe
	, PreferredWayToContactStudent  
	, BestTimeToReachStudent  
	, StudentEmailAddress  
	, StudentPhoneNumber  
	, StudentBirthday
)
VALUES (
	@studentId
	, @notes
	-- guardian contact information
	, @guardianName
	, @preferredWayToContactGuardian 
	, @bestTimeToReachGuardian 
	, @guardianEmailAddress 
	, @guardianPhoneNumber 
	, @guardianIsSubscribedToWeeklySnapshotEmail
	, @guardianRelationship
	-- secondary guardian contact information
	, @secondaryGuardianName
	, @secondaryGuardianEmailAddress
	, @secondaryGuardianPhoneNumber
	, @secondaryGuardianRelationship
	-- student contact information
	, @homeAddress
	, @city
	, @state
	, @zipCode
	, @notesAboutMe
	, @preferredWayToContactStudent 
	, @bestTimeToReachStudent 
	, @studentEmailAddress 
	, @studentPhoneNumber 
	, @studentBirthday
);