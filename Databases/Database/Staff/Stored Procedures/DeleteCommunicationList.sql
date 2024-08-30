CREATE PROCEDURE Staff.DeleteCommunicationList (
	@id INT
	, @currentUserId INT
)
AS
SET NOCOUNT ON

DELETE Staff.CommunicationLists
WHERE Id = @id
	AND StaffId = @currentUserId -- staff members should only be able to delete their own 