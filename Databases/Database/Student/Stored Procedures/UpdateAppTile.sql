CREATE PROCEDURE Student.UpdateAppTile (
	@currentUserId INT
	, @id INT 
	, @show BIT 
	, @orderBy INT 
)
AS
SET NOCOUNT ON

UPDATE Student.AppTiles
SET 
	Show = @show
	, OrderBy = @orderBy
WHERE 
	Id = @id 
	AND UserId = @currentUserId