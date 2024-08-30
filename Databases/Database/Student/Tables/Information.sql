CREATE TABLE Student.Information
(
	-- The columns in this table will override any values the student previously applied in their Orientation
	-- Upon saving new values in Orientation, the corresponding values will be NULL'ed
	StudentId INT NOT NULL
	, Notes NVARCHAR(250) NULL
	-- Guardian Contact Information
	, GuardianName NVARCHAR(100) NULL
	, PreferredWayToContactGuardian TINYINT NULL  -- 1 - Email, 2 - Phone, 3 - Text
	, GuardianEmailAddress NVARCHAR(320) NULL
	, GuardianPhoneNumber NVARCHAR(20) NULL
	, BestTimeToReachGuardian TINYINT NULL -- 1 - Morning, 2 - Afternoon, 3 - Evening
	-- Student Contact Information
	, HomeAddress NVARCHAR(100) NULL
	, City NVARCHAR(60) NULL
	, [State] NVARCHAR(40) NULL
	, ZipCode NVARCHAR (5) NULL
	, NotesAboutMe NVARCHAR (1000) NULL
	, PreferredWayToContactStudent TINYINT NULL 
	, StudentPhoneNumber NVARCHAR(320) NULL
	, StudentEmailAddress NVARCHAR(320) NULL
	, BestTimeToReachStudent TINYINT NULL 
	-- Secondary Guardian Contact Information
	, SecondaryGuardianName NVARCHAR(100) NULL
	, PreferredWayToContactSecondaryGuardian TINYINT NULL -- 1 - Email, 2 - Phone, 3 - Text
	, SecondaryGuardianEmailAddress NVARCHAR(320) NULL
	, SecondaryGuardianPhoneNumber NVARCHAR(20) NULL
	, BestTimeToReachSecondaryGuardian TINYINT NULL -- 1 - Morning, 2 - Afternoon, 3 - Evening
	, GuardianIsSubscribedToWeeklySnapshotEmail BIT NOT NULL CONSTRAINT DF_InformationGuardianSubscribed DEFAULT (1)
	, SecondaryGuardianIsSubscribedToWeeklySnapshotEmail BIT NOT NULL CONSTRAINT DF_InformationSecondaryGuardianSubscribed DEFAULT (0)
	, GuardianRelationship NVARCHAR(50) NULL
	, SecondaryGuardianRelationship NVARCHAR(50) NULL
	, StudentBirthday DATE NULL
	, CONSTRAINT PK_StudentInformation PRIMARY KEY CLUSTERED (StudentId)
	, CONSTRAINT FK_StudentInformation_StudentId FOREIGN KEY (StudentId) REFERENCES Common.Users (Id)
)
