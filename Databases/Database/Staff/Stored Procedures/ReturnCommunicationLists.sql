CREATE PROCEDURE Staff.ReturnCommunicationLists (
	@currentUserId INT
)
AS
SET NOCOUNT ON

SELECT 
	a.Id
	, a.Name
	, a.StaffId
FROM Staff.CommunicationLists a
WHERE a.StaffId = @currentUserId