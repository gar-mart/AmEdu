CREATE PROCEDURE Attendance.CreateAbsence (
	@userId INT
	, @startDate DATE
	, @endDate DATE
	, @reason NVARCHAR(500)
	, @createdByUserId INT
	, @currentDateTime DATETIME2(7)
	, @newId INT OUTPUT
)
AS
SET NOCOUNT ON

IF EXISTS (SELECT * FROM  Attendance.Absences a WHERE a.UserId = @userId AND ((a.StartDate BETWEEN @startDate AND @endDate) OR (a.EndDate BETWEEN @startDate AND @endDate) OR
	         (a.StartDate < @startDate AND a.EndDate > @endDate)))
	THROW 50000, 'Absence date range conflict.', 0 


INSERT INTO Attendance.Absences (UserId, StartDate, EndDate, Reason, CreatedByUserId, CreatedDate) VALUES (
	@userId 
	, @startDate 
	, @endDate 
	, @reason
	, @createdByUserId 
	, @currentDateTime
)

SET @newId = SCOPE_IdENTITY()