CREATE PROCEDURE Orientation.ReturnOrientationReport
AS
SET NOCOUNT ON

DECLARE @ConsiderAsNextGradeLevel BIT = IIF(MONTH(SYSUTCDATETIME()) BETWEEN 5 AND 6, 1, 0)

SELECT
	a.Id StudentId
	, a.LastName + ', ' + a.FirstName Name
	, a.GradeLevel
	, a.OrientationStartTime
	, a.Email StudentEmail	
	
	, cs.BestTimeToReachAsGuardian
	, cs.BroughtToAmEduChoices
	, cs.BroughtToAmEduOther
	, cs.City
	, cs.ContactAsGuardianInfo
	, cs.ContactAsStudentInfo
	, cs.ExtraCurricularActivities
	, cs.GuardianEmailAddress
	, cs.GuardianIsSubscribedToWeeklySnapshotEmail
	, cs.GuardianName
	, cs.GuardianPhoneNumber
	, cs.GuardianRelationship
	, cs.HomeAddress
	, cs.Interests
	, cs.IsConfirmed
	, cs.NotesAboutMe
	, cs.SecondaryGuardianEmailAddress
	, cs.SecondaryGuardianName
	, cs.SecondaryGuardianPhoneNumber
	, cs.SecondaryGuardianRelationship
	, cs.State
	, cs.StudentBirthday
	, cs.StudentEmailAddress
	, cs.StudentPhoneNumber
	, cs.StudentPhoneNumber
	, cs.UserId
	, cs.WayToContactAsGuardian
	, cs.WayToReachAsStudent
	, cs.ZipCode
	, mentor.Name MentorName
FROM Common.vwUsers a
LEFT JOIN Common.Users mentor ON a.MentorId = mentor.Id
LEFT JOIN Orientation.Step_ConnectionSurvey cs on a.Id = cs.UserId
WHERE a.IsStaff = 0 AND a.IsActive = 1
ORDER BY a.LastName

SELECT
	a.Id StudentId
	, b.Semester SemesterNumber
	, c.Name ElectiveName
FROM Common.Users a
CROSS APPLY (
	SELECT GradeLevel = (
		SELECT IIF(@ConsiderAsNextGradeLevel = 1
			, CAST(ISNULL(TRY_CAST(Users.GradeLevel AS INT), 0) + 1 AS NVARCHAR(2))
			, Users.GradeLevel)
		FROM Common.Users
		WHERE Id = a.Id
	)
) d 
INNER JOIN Orientation.Step_UserElectives b ON a.Id = b.UserId AND d.GradeLevel = b.GradeLevel
INNER JOIN Orientation.Electives c ON b.ElectiveId = c.Id
ORDER BY StudentId, SemesterNumber, ElectiveName
