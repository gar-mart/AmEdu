CREATE PROCEDURE Student.ReturnReFuelLogs (
	@studentId INT
	, @date DATE
)
AS
SET NOCOUNT ON
	
SELECT
	Id
	, StudentId
	, CheckedIn
	, CheckedOut
	, CreatedUserId
	, CreatedDate
	, UpdatedUserId
	, UpdatedDate
FROM Student.ReFuelLogs
WHERE StudentId = @studentId
	AND [Date] = @date
ORDER BY 
	IIF(CheckedOut IS NULL, 0, 1)
	, CheckedOut DESC