CREATE PROCEDURE Common.CreateBreak (
	@startDate DATE
	, @endDate DATE
	, @name NVARCHAR(200)
	, @newId INT OUTPUT
)
AS
SET NOCOUNT ON

INSERT INTO Common.Breaks (StartDate, EndDate, Name)
VALUES (@startDate, @endDate, @name)

SET @newId = SCOPE_IdENTITY()
