CREATE PROCEDURE Attendance.UpdateLiveLessonPoints (
	@classId INT
	, @date DATE
	, @staffId INT
	, @currentDateTime DATETIME2(7)
	, @userList Tvp.IdList READONLY
)
AS
SET NOCOUNT ON

-- create/delete/update live lesson points
;WITH TRG AS (
	SELECT *
	FROM Attendance.LiveLessonPoints a
	WHERE
		a.ClassId = @classId
		AND a.Date = @date
)

MERGE TRG USING @userList SRC ON TRG.UserId = SRC.Id
WHEN MATCHED THEN UPDATE SET StaffId = @staffId
WHEN NOT MATCHED BY TARGET THEN INSERT (ClassId, Date, UserId, StaffId, CreatedDate)
VALUES (@classId, @date, SRC.Id, @staffId, @currentDateTime)
WHEN NOT MATCHED BY SOURCE THEN DELETE;

-- create points
;WITH TRG AS (
	SELECT *
	FROM Attendance.Points
), SRC AS (
	SELECT * 
	FROM Attendance.LiveLessonPoints a
	WHERE 
		a.ClassId = @classId
		AND a.Date = @date
)
MERGE TRG USING SRC ON TRG.LiveLessonId = SRC.Id
WHEN NOT MATCHED BY TARGET THEN INSERT (UserId, StaffId, Date, CreatedDate, Type, Value, LiveLessonId)
VALUES (SRC.UserId, @staffId, @date, GETDATE(), 5, 1, SRC.Id);