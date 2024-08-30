CREATE PROCEDURE Attendance.UpdateAbsence (
    @id INT
	, @userId INT
	, @startDate DATE
	, @endDate DATE
	, @reason NVARCHAR(500)
	, @createdByUserId INT
	, @currentDateTime DATETIME2(7)
)
AS
SET NOCOUNT ON

IF EXISTS (SELECT * FROM  Attendance.Absences a WHERE a.UserId = @userId AND a.Id != @id AND ((a.StartDate BETWEEN @startDate AND @endDate) OR (a.EndDate BETWEEN @startDate AND @endDate) OR
	         (a.StartDate < @startDate AND a.EndDate > @endDate)))
	THROW 50000, 'Absence date range conflict.', 0 

;WITH TRG AS (
	SELECT *
	FROM Attendance.Absences a
	WHERE
		a.Id = @id
), SRC AS (
	SELECT 
	       @id Id
	WHERE @reason IS NOT NULL
)
MERGE TRG USING SRC SRC ON TRG.Id = SRC.Id
WHEN MATCHED THEN UPDATE SET	
	Reason = @reason
	, UserId = @userId
	, StartDate = @startDate
	, EndDate = @endDate
	, CreatedDate = @currentDateTime -- don't make a distinction here between created and updated 
	, CreatedByUserId = @createdByUserId
WHEN NOT MATCHED THEN INSERT (UserId, StartDate, EndDate, Reason, CreatedByUserId, CreatedDate)
VALUES (
	@userId
	, @startDate
	, @endDate
	, @reason
	, @createdByUserId
	, @currentDateTime
)
WHEN NOT MATCHED BY SOURCE THEN DELETE;