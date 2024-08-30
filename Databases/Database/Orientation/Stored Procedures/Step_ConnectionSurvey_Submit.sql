CREATE PROCEDURE Orientation.Step_ConnectionSurvey_Submit(
	@userId INT 
	, @guardianName NVARCHAR(160) 
	, @wayToContactAsGuardian TINYINT -- 1 - Email  2 - Phone  3 - Text
	, @guardianEmailAddress NVARCHAR(320) 
	, @guardianPhoneNumber NVARCHAR(14) -- (xxx) xxx-xxxx
	, @bestTimeToReachAsGuardian TINYINT -- 1 - Morning  2 - Afternoon  3 - Evening
	, @wayToReachAsStudent TINYINT -- 1 - Email  2 - Phone  3 - Text
	, @studentPhoneNumber NVARCHAR(14) -- 6-12 grade
	, @studentEmailAddress NVARCHAR(320) -- 6-12 grade
	, @secondaryGuardianName NVARCHAR(160) 
	, @secondaryGuardianEmailAddress NVARCHAR(320)
	, @secondaryGuardianPhoneNumber NVARCHAR(320) 
	, @interests NVARCHAR(1000) 
	, @extraCurricularActivities NVARCHAR(1000)
	, @homeAddress NVARCHAR(100) 
	, @city NVARCHAR(60)
	, @state NVARCHAR(40)
	, @zipCode NVARCHAR(5)
	, @notesAboutMe NVARCHAR(1000)
	, @broughtToAmEduChoices SMALLINT -- this is a bit-wise created value. 1 = Medical Reasons, 2 = Ability to work ahead/above grade level, 4 = Dual Enrollment, 8 = Plan to travel while doing school, 16 = Flexible Schedule, 32 = Preference for Online Learning, 64 = Small School Experience, 128 = Other
	, @broughtToAmEduOther NVARCHAR(100) 
	, @guardianIsSubscribedToWeeklySnapshotEmail BIT
	, @guardianRelationship NVARCHAR(50)
	, @secondaryGuardianRelationship NVARCHAR(50)
	, @studentBirthday DATE
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

		MERGE Orientation.Step_ConnectionSurvey TRG
		USING (SELECT @userId UserId) SRC ON TRG.UserId = SRC.UserId
		WHEN MATCHED THEN UPDATE SET
			GuardianName = @guardianName
			, WayToContactAsGuardian = @wayToContactAsGuardian
			, GuardianEmailAddress = @guardianEmailAddress
			, GuardianPhoneNumber = @guardianPhoneNumber
			, BestTimeToReachAsGuardian = @bestTimeToReachAsGuardian
			, WayToReachAsStudent = @wayToReachAsStudent
			, StudentPhoneNumber = @studentPhoneNumber
			, StudentEmailAddress = @studentEmailAddress
			, SecondaryGuardianName = @secondaryGuardianName
			, SecondaryGuardianEmailAddress = @secondaryGuardianEmailAddress
			, SecondaryGuardianPhoneNumber = @secondaryGuardianPhoneNumber
			, Interests = @interests
			, ExtraCurricularActivities = @extraCurricularActivities
			, HomeAddress = @homeAddress
			, City = @city
			, [State] = @state
			, ZipCode = @zipCode
			, NotesAboutMe = @notesAboutMe
			, BroughtToAmEduChoices = @broughtToAmEduChoices
			, BroughtToAmEduOther = @broughtToAmEduOther
			, GuardianIsSubscribedToWeeklySnapshotEmail = @guardianIsSubscribedToWeeklySnapshotEmail
			, GuardianRelationship = @guardianRelationship
			, SecondaryGuardianRelationship = @secondaryGuardianRelationship
			, StudentBirthday = @studentBirthday
			, IsConfirmed = 1
		WHEN NOT MATCHED THEN INSERT(
			UserId
			, GuardianName 
			, WayToContactAsGuardian 
			, GuardianEmailAddress 
			, GuardianPhoneNumber 
			, BestTimeToReachAsGuardian 
			, WayToReachAsStudent 
			, StudentPhoneNumber 
			, StudentEmailAddress 
			, SecondaryGuardianName 
			, SecondaryGuardianEmailAddress 
			, SecondaryGuardianPhoneNumber 
			, Interests 
			, ExtraCurricularActivities 
			, HomeAddress 
			, City
			, [State]
			, ZipCode
			, NotesAboutMe
			, BroughtToAmEduChoices 
			, BroughtToAmEduOther 
			, GuardianIsSubscribedToWeeklySnapshotEmail
			, GuardianRelationship 
			, SecondaryGuardianRelationship 
			, StudentBirthday 
		)
		VALUES (
			@userId
			, @guardianName
			, @wayToContactAsGuardian
			, @guardianEmailAddress
			, @guardianPhoneNumber
			, @bestTimeToReachAsGuardian
			, @wayToReachAsStudent
			, @studentPhoneNumber
			, @studentEmailAddress
			, @secondaryGuardianName
			, @secondaryGuardianEmailAddress
			, @secondaryGuardianPhoneNumber
			, @interests
			, @extraCurricularActivities
			, @homeAddress
			, @city
			, @state
			, @zipCode
			, @notesAboutMe
			, @broughtToAmEduChoices
			, @broughtToAmEduOther
			, @guardianIsSubscribedToWeeklySnapshotEmail
			, @guardianRelationship 
			, @secondaryGuardianRelationship 
			, @studentBirthday 
		);

		-- "override" staff input contact information as we want to take the student's updates
		UPDATE Student.Information SET
			PreferredWayToContactGuardian = NULL
			, GuardianEmailAddress = NULL
			, GuardianPhoneNumber = NULL
			, GuardianName = NULL
			, BestTimeToReachGuardian = NULL
			, PreferredWayToContactStudent = NULL
			, StudentEmailAddress = NULL
			, StudentPhoneNumber = NULL
			, BestTimeToReachStudent = NULL
			, SecondaryGuardianName = NULL
			, PreferredWayToContactSecondaryGuardian = NULL
			, SecondaryGuardianEmailAddress = NULL
			, SecondaryGuardianPhoneNumber = NULL
			, BestTimeToReachSecondaryGuardian = NULL
			, HomeAddress = NULL
			, City = NULL
			, [State] = NULL
			, ZipCode = NULL
			, NotesAboutMe = NULL
			, GuardianRelationship = NULL
			, SecondaryGuardianRelationship = NULL
			, StudentBirthday = NULL
		WHERE StudentId = @userId
		
	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH