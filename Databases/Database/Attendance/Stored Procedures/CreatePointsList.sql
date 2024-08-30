CREATE PROCEDURE Attendance.CreatePointsList (
	@points Tvp.Points READONLY
	, @currentDateTime DATETIME2(7)
)
AS
SET NOCOUNT ON

DECLARE @userId INT
DECLARE @staffId INT
DECLARE @type TINYINT
DECLARE @value SMALLINT
DECLARE @date DATETIME2(0)
DECLARE @comments NVARCHAR(500)	
DECLARE @pageSource TINYINT

DECLARE PointsCursor CURSOR LOCAL FAST_FORWARD
FOR SELECT p.UserId, p.StaffId, p.Type, p.Value, p.Date, p.Comments, p.PageSource
FROM @points p
OPEN PointsCursor
FETCH NEXT FROM PointsCursor INTO @userId, @staffId, @type, @value, @date, @comments, @pageSource


WHILE @@FETCH_STATUS = 0 BEGIN
	EXEC Attendance.CreatePoints @userId, @staffId, @type, @value, @currentDateTime, @date, @comments, @pageSource
	FETCH NEXT FROM PointsCursor INTO @userId, @staffId, @type, @value, @date, @comments, @pageSource
END

CLOSE PointsCursor
DEALLOCATE PointsCursor