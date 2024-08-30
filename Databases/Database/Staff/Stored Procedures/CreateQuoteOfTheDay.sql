CREATE PROCEDURE Staff.CreateQuoteOfTheDay (
	@currentUserId INT
	, @quote NVARCHAR(MAX)
	, @author NVARCHAR(100)
	, @date DATE
	, @newId INT OUTPUT
)
AS
SET NOCOUNT ON
IF NOT EXISTS (SELECT * FROM Common.vwUsers WHERE Id = @currentUserId AND IsStaff = 1) 
	THROW 50000, 'User is not a staff user', 0

DECLARE @baselineDate DATE = ISNULL((SELECT TOP 1 BaselineDate FROM Staff.QuoteMetadata), @date)

INSERT INTO Staff.QuoteMetadata (Quote, Author, OrderBy, BaselineDate) VALUES (
	@quote
	, @author
	, (
		SELECT ISNULL(MAX(OrderBy), 0)
		FROM Staff.QuoteMetadata
	)
	, @baselineDate
)

SET @newId = SCOPE_IdENTITY()