-- Summary: Used on the Communication page to show filtered communication entries
CREATE PROCEDURE Staff.ReturnPotentialCommunicationEntries (
	@communicationListId INT
	, @mentorId INT
	, @grades NVARCHAR(MAX) -- comma delimited list
	, @domain NVARCHAR(MAX)
)
AS
SET NOCOUNT ON
-- saved communication list filter
SELECT 
	communicationEntry.CommunicationListId
	, communicationEntry.IncludeGuardian1
	, communicationEntry.IncludeGuardian2
	, communicationEntry.IncludeMentor
	, communicationEntry.IncludeStudent
	, communicationEntry.IncludeStaff
	
	, userTable.Id UserId
	, userTable.Name UserName
	, userTable.Email UserEmailAddress
	, info.GuardianName
	, info.GuardianEmailAddress
	, info.SecondaryGuardianName
	, info.SecondaryGuardianEmailAddress
	, info.GradeLevel
	, info.MentorName
	, info.MentorEmail
	, userTable.IsStaff
FROM Staff.CommunicationListEntries communicationEntry
LEFT JOIN Student.vwInformation info ON communicationEntry.UserId = info.StudentId
INNER JOIN Common.vwUsers userTable ON userTable.Id = communicationEntry.UserId
WHERE communicationEntry.CommunicationListId = @communicationListId
	AND userTable.IsActive = 1

UNION

-- general filters
SELECT
	0 CommunicationListId
	, 0 IncludeGuardian
	, 0 IncludeGuardian2
	, 0 IncludeMentor
	, 0 IncludeStudent
	, 0 IncludeStaff
	
	, info.StudentId UserId
	, info.StudentName UserName
	, info.StudentSchoolEmailAddress UserEmailAddress
	, info.GuardianName
	, info.GuardianEmailAddress
	, info.SecondaryGuardianName
	, info.SecondaryGuardianEmailAddress
	, info.GradeLevel
	, info.MentorName
	, info.MentorEmail
	, u.IsStaff
FROM Student.vwInformation info 
INNER JOIN Common.vwUsers u ON info.StudentId = u.Id
WHERE @communicationListId IS NULL
	AND ( 
		NULLIF(@grades, '') IS NULL 
		OR info.GradeLevel IN (SELECT value FROM STRING_SPLIT(@grades, ','))
	)
	AND (
		NULLIF(@mentorId, 0) IS NULL
		OR info.MentorId = @mentorId
	)
	AND (
		NULLIF(@domain, '') IS NULL
		OR info.StudentSchoolEmailAddress LIKE '%' + @domain + '%'
	)
	AND u.IsActive = 1
UNION
-- staff
SELECT
	0 CommunicationListId
	, 0 IncludeGuardian
	, 0 IncludeGuardian2
	, 0 IncludeMentor
	, 0 IncludeStudent
	, 0 IncludeStaff
	
	, a.Id UserId
	, a.Name UserName
	, a.Email UserEmailAddress
	, NULL
	, NULL
	, NULL
	, NULL
	, NULL
	, NULL
	, NULL
	, 1 IsStaff
FROM Common.vwUsers a
WHERE @communicationListId IS NULL
	AND (
		NULLIF(@domain, '') IS NULL
		OR a.Email LIKE '%' + @domain+ '%'
	)
	AND a.IsActive = 1
	AND a.IsStaff = 1
ORDER BY UserName
