CREATE PROCEDURE Attendance.ReturnInterventionEmailTemplateByInterventionId (
	@id INT
)
AS
SET NOCOUNT ON

SELECT 
	t.InterventionLevel
	, t.EmailFrom
	, t.EmailTo
	, t.EmailSubject
	, t.IncludeEngagementFlagSnapshot
	, t.EmailBody
	, Calculations.EmailFromAddress
FROM Attendance.Interventions i
INNER JOIN Attendance.InterventionEmailTemplates t ON i.Level = t.InterventionLevel
INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
INNER JOIN Common.Users Student ON ef.UserId = Student.Id
CROSS APPLY (
	SELECT CASE 
		WHEN t.EmailFrom = 0 AND Student.MentorId > 0 
			-- Use the mentor's email address as long as the student is assigned one
			THEN (SELECT Email FROM Common.Users WHERE Id = Student.MentorId) 
		WHEN t.EmailFrom = 1 AND EXISTS (SELECT * FROM Common.Counselors WHERE Counselors.GradeLevel = Student.GradeLevel) 
			-- Use one of the counselors email address as long as the student is assigned one (via grade level)
			THEN (SELECT TOP 1 Counselor.Email FROM Common.Users Counselor INNER JOIN Common.Counselors ON Counselor.Id = Counselors.UserId)
		ELSE
			'Default@AmEduglobal.org'
	END EmailFromAddress
) Calculations
WHERE i.Id = @id

SELECT 
	a.Filename
	, a.InterventionLevel
FROM Attendance.Interventions i
INNER JOIN Attendance.InterventionEmailAttachments a ON i.Level = a.InterventionLevel
WHERE i.Id = @id
ORDER BY a.Filename

-- to recipients (1: Mentor, 2: Counselor, 4: Guardian1, 8: Guardian2, 16: Student, 32: Secondary Mentor)
;WITH Template AS (
	SELECT 
		t.EmailTo
		, u.MentorId
		, u.SecondaryMentorId
		, u.GradeLevel
		, u.Email StudentEmailAddress
		, ef.UserId StudentId
	FROM Attendance.Interventions i
	INNER JOIN Attendance.InterventionEmailTemplates t ON i.Level = t.InterventionLevel
	INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
	INNER JOIN Common.Users u ON ef.UserId = u.Id
	WHERE i.Id = @id
)
SELECT 
	Recipients.Email
	, Recipients.EmailTo
FROM Template
CROSS APPLY (
	-- Mentor
	SELECT u.Email
		, 1 EmailTo
	FROM Common.Users u
	WHERE Template.EmailTo & 1 = 1
		AND Template.MentorId = u.Id
	UNION

	-- Secondary Mentor
	SELECT u.Email
		, 32 EmailTo
	FROM Common.Users u
	WHERE Template.EmailTo & 32 = 32
		AND Template.SecondaryMentorId = u.Id
	UNION

	-- Counselor(s)
	SELECT u.Email
		, 2 
	FROM Common.Users u
	INNER JOIN Common.Counselors c ON u.Id = c.UserId
	WHERE Template.EmailTo & 2 = 2
		AND Template.GradeLevel = c.GradeLevel
		AND u.IsActive = 1
	UNION
	
	-- Guardian1
	SELECT i.GuardianEmailAddress
		, 4
	FROM Student.vwInformation i
	WHERE Template.EmailTo & 4 = 4
		AND Template.StudentId = i.StudentId
		AND i.GuardianEmailAddress IS NOT NULL
	UNION
	
	-- Guardian2
	SELECT i.SecondaryGuardianEmailAddress
		, 8
	FROM Student.vwInformation i
	WHERE Template.EmailTo & 8 = 8
		AND Template.StudentId = i.StudentId
		AND i.SecondaryGuardianEmailAddress IS NOT NULL
	UNION
	
	-- Student
	SELECT Template.StudentEmailAddress
		, 16
	WHERE Template.EmailTo & 16 = 16
	UNION

	-- Interventionist(s)
	SELECT u.Email
		, 64
	FROM Common.vwUsers u
	WHERE Template.EmailTo & 64 = 64
		AND u.IsActive = 1
		AND u.IsInterventionist = 1
) Recipients
ORDER BY Recipients.EmailTo
	, Recipients.Email