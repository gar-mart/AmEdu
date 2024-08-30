CREATE PROCEDURE Attendance.UpdateTardiness (
	@classId INT
	, @userId INT
	, @staffId INT
	, @date DATE
	, @type TINYINT -- NULL = Not Tardy, 1 = Late, 2 = In and Out, 3 = Left Early, 4 = Disengaged
	, @comment NVARCHAR(500)
	, @currentDateTime DATETIME2(7)
)
AS
SET NOCOUNT ON


;WITH TRG AS (
	SELECT *
	FROM Attendance.Tardies a
	WHERE
		a.ClassId = @classId
		AND a.Date = @date
		AND a.UserId = @userId
), SRC AS (
	SELECT @date Date
		, @userId UserId
		, @classId ClassId
	WHERE @type IS NOT NULL
)
MERGE TRG USING SRC SRC ON TRG.Date = SRC.Date AND TRG.UserId = SRC.UserId AND TRG.ClassId = SRC.UserId 
WHEN MATCHED THEN UPDATE SET	
	StaffId = @staffId
	, Type = @type
	, Comment = @comment
	, CreatedDate = @currentDateTime -- don't make a distinction here between created and updated 
WHEN NOT MATCHED THEN INSERT (ClassId, UserId, Date, StaffId, Type, Comment, CreatedDate)
VALUES (
	SRC.ClassId
	, SRC.UserId
	, SRC.Date
	, @staffId
	, @type
	, @comment
	, @currentDateTime
)
WHEN NOT MATCHED BY SOURCE THEN DELETE;