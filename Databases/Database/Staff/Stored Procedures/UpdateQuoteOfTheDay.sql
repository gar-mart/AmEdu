CREATE PROCEDURE Staff.UpdateQuoteOfTheDay (
	@currentUserId INT
	, @quote NVARCHAR(MAX)
	, @author NVARCHAR(100)
	, @orderBy INT 
	, @id INT
	, @date DATE
)
AS
SET NOCOUNT ON
IF NOT EXISTS (SELECT * FROM Common.vwUsers WHERE Id = @currentUserId AND IsStaff = 1) 
	THROW 50000, 'User is not a staff user', 0

UPDATE Staff.QuoteMetadata
SET 
	Quote = @quote
	, Author = @author
	-- need to calculate order by based on number of quotes and number of days since baseline
	, OrderBy = @orderBy 
	, BaselineDate = @date
WHERE Id = @id
