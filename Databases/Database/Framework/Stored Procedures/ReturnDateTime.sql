CREATE PROCEDURE Framework.ReturnDateTime (
	@currentUserId INT
	, @currentUserTimeZoneId SYSNAME
	, @causeError BIT 
	, @causeUniqueException BIT
	, @causeOverflowException BIT
)
AS
SET NOCOUNT ON

-- Make sure the one record exists
IF NOT EXISTS (SELECT * FROM Framework.DateTime)
	INSERT INTO Framework.DateTime (Date, Time, DateTime) 
	VALUES (GETDATE(), GETDATE(), GETDATE())

IF @causeError = 1
	-- Demonstration of causing a custom Application Database error (DatabaseException)
	RETURN 1

IF @causeUniqueException = 1
	-- Demonstration of causing a primary key constraint violation (SqlException -> DatabaseException)
	INSERT INTO Framework.DateTime (Date, Time, DateTime) 
	VALUES (GETDATE(), GETDATE(), GETDATE())

IF @causeOverflowException = 1
	-- Demonstration of causing an overflow exception (SqlException -> DatabaseException
	UPDATE Framework.DateTime SET
	Date = DATEADD(YEAR, 10000, Date)
	

SELECT 
	Date
	, Time
	, DateTime 
FROM Framework.DateTime