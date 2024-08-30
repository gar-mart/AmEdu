CREATE PROCEDURE Student.ReturnStudentSupportGroups (
	@studentEmails Tvp.StringList READONLY
)
AS
SET NOCOUNT ON
	
SELECT  
	i.StudentId
	, i.StudentFirstName
	, i.StudentLastName
	, i.StudentSchoolEmailAddress StudentEmail

	, i.MentorId
	, i.MentorFirstName
	, i.MentorLastName
	, i.MentorEmail

	, i.GuardianName
	, i.GuardianEmailAddress

	, i.SecondaryGuardianName
	, i.SecondaryGuardianEmailAddress
FROM Student.vwInformation i
WHERE i.StudentSchoolEmailAddress IN (SELECT String FROM @studentEmails)