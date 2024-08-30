CREATE PROCEDURE Orientation.ReturnStepConnectionSurvey(
	@userId INT
)
AS
SET NOCOUNT ON

SELECT 
	UserId 
	, GuardianName 
	, WayToContactAsGuardian -- 1 - Email  2 - Phone  3 - Text
	, GuardianEmailAddress 
	, GuardianPhoneNumber -- (xxx) xxx-xxxx
	, BestTimeToReachAsGuardian  -- 1 - Morning  2 - Afternoon  3 - Evening
	, WayToReachAsStudent -- 1 - Email  2 - Phone  3 - Text
	, StudentPhoneNumber -- 6-12 grade
	, StudentEmailAddress -- 6-12 grade
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
	, BroughtToAmEduChoices -- this is a bit-wise created value. 1 = Medical Reasons, 2 = Ability to work ahead/above grade level, 4 = Dual Enrollment, 8 = Plan to travel while doing school, 16 = Flexible Schedule, 32 = Preference for Online Learning, 64 = Small School Experience, 128 = Other
	, BroughtToAmEduOther 
	, GuardianIsSubscribedToWeeklySnapshotEmail
	, GuardianRelationship
	, SecondaryGuardianRelationship
	, StudentBirthday
	, IsConfirmed
FROM Orientation.Step_ConnectionSurvey
WHERE UserId = @userId

