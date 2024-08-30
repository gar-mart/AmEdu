CREATE PROCEDURE Common.UpdateBreak (
	@id INT
	, @startDate DATE
	, @endDate DATE
	, @name NVARCHAR(200)
)
AS
SET NOCOUNT ON

UPDATE Common.Breaks SET
	StartDate = COALESCE(@startDate, StartDate)
	, EndDate = COALESCE(@endDate, EndDate)
	, Name = COALESCE(@name, Name)
WHERE Id = @id
