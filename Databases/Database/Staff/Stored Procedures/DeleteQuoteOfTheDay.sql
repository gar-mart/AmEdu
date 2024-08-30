CREATE PROCEDURE Staff.DeleteQuoteOfTheDay (
	@currentUserId INT
	, @id INT
)
AS
SET NOCOUNT ON
IF NOT EXISTS (SELECT * FROM Common.vwUsers WHERE Id = @currentUserId AND IsStaff = 1) 
	THROW 50000, 'User is not a staff user', 0

DELETE Staff.QuoteMetadata
WHERE Id = @id
