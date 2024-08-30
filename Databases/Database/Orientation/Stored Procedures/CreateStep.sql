CREATE PROCEDURE Orientation.CreateStep (
	@orderBy INT
)
AS
SET NOCOUNT ON

DECLARE @NewId INT

SELECT 
	@NewId = MAX(Id) + 1
	, @orderBy = ISNULL(NULLIF(@orderBy, 0), MAX(OrderBy) + 1)
FROM Orientation.Steps

IF @NewId IS NULL OR @orderBy IS NULL 
BEGIN
	-- this case would only occur if there were no steps yet.
	SET @NewId = 1
	SET @orderBy = 1
END

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	-- shift steps by one to accomodate new slide
	UPDATE Orientation.Steps SET
		OrderBy = OrderBy + 1
	WHERE OrderBy >= @orderBy

	INSERT INTO Orientation.Steps (Id, Name, OrderBy, ContentFileName) VALUES (
		@NewId
		, 'New Slide'
		, @OrderBy
		, 'slide' 
	)

	SELECT	
		Steps.Id
		, Steps.Name
		, Steps.OrderBy
		, Steps.ContentFileName
	FROM Orientation.Steps
	WHERE Id = @NewId

	COMMIT TRANSACTION
END TRY
BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH

