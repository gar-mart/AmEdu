CREATE PROCEDURE Staff.ReturnCommunicationListById (
	@id INT
)
AS
SET NOCOUNT ON

SELECT 
	a.Id
	, a.Name
	, a.StaffId
FROM Staff.CommunicationLists a
WHERE a.Id = @id

SELECT 
	communicationEntry.CommunicationListId
	, communicationEntry.IncludeGuardian1
	, communicationEntry.IncludeGuardian2
	, communicationEntry.IncludeMentor
	, communicationEntry.IncludeStudent	
	, communicationEntry.UserId
	, communicationEntry.IncludeStaff

	, userTable.Name UserName
	, userTable.Email UserEmailAddress
	, info.GuardianName
	, info.GuardianEmailAddress
	, info.SecondaryGuardianName
	, info.SecondaryGuardianEmailAddress
	, info.MentorName
	, info.MentorEmail
FROM Staff.CommunicationListEntries communicationEntry
LEFT JOIN Student.vwInformation info ON communicationEntry.UserId = info.StudentId
INNER JOIN Common.Users userTable ON userTable.Id = communicationEntry.UserId
WHERE communicationEntry.CommunicationListId = @id