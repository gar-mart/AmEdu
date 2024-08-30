CREATE PROCEDURE Common.ReturnBreakById (
	@id INT
)
AS
SET NOCOUNT ON

SELECT
	Id
	, StartDate
	, EndDate
	, Name
FROM Common.Breaks
WHERE Id = @id
