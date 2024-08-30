-- Summary: 
--   Returns the actual number of assignments completed for assignments that are due within the specified date range for a given student.
--   It does not count assignments that are completed after the due date.
CREATE PROCEDURE Staff.ReturnAssignmentsCompleted (
	@studentId INT
	, @startDate DATETIME2(0)
	, @endDate DATETIME2(0)	
)
AS 
SET NOCOUNT ON

SELECT 
	SUM(IIF(SubmittedDate <= DueDate, 1, 0)) CompletedCount
	, COUNT(*) TotalCount
FROM Attendance.fnClassUserWork(@startDate, @endDate, @studentId, DEFAULT) cuw
WHERE DueDate BETWEEN @startDate AND @endDate
