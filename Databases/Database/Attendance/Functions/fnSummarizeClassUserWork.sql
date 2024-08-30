-- Summary:
--   Summarize Class User Work for a given date range. 
--   Only includes data that was not marked as deleted.
--   Optionally supply a userId to summarize data for a given user.
--   Optionally supply a classId to summarize data for a given class.
CREATE FUNCTION Attendance.fnSummarizeClassUserWork (
	@startDate DATE
	, @endDate DATE
	, @userId INT = NULL
	, @classId INT = NULL
)
RETURNS TABLE AS RETURN 
(	 
	SELECT
		cuw.UserId
		, COUNT(*) TotalAssignments 
		, COUNT(CASE WHEN cuw.FinalDueDate BETWEEN @startDate AND @endDate THEN 1 END) TotalAssignmentsDateRange 
		-- Calculation: # of completed assignments / # of assignments due for the selected time frame.
		-- Due date for this metric = Due Date + Grace Period
		, COUNT(CASE WHEN cuw.FinalDueDate BETWEEN @startDate AND @endDate AND cuw.FinalDueDate >= cuw.SubmittedDate THEN 1 END) AssignmentsCompletedDateRange
		-- Same as AssignmentsCompletedDateRange, however the time frame is different
		-- If a course has start/end dates from March 1 to June 1, and the selected end date on the Engagement Report is April 1, then we would want to calculate only from March 1 to April 1.
		, COUNT(CASE WHEN cuw.FinalDueDate >= cuw.SubmittedDate AND @endDate >= cuw.SubmittedDate THEN 1 END) AssignmentsCompleted 
		-- assignments that are past their due date, but before the late due date
		, COUNT(CASE WHEN cuw.SubmittedDate IS NULL AND cuw.FinalDueDate > cuw.DueDate AND SYSUTCDATETIME() AT TIME ZONE 'UTC' AT TIME ZONE 'Eastern Standard Time' BETWEEN cuw.DueDate AND cuw.FinalDueDate THEN 1 END) AssignmentsInGracePeriod 
		-- # of assignments completed by Due Date / Total # of assignments
		-- do not use grace period
		, COUNT(CASE WHEN cuw.FinalDueDate BETWEEN @startDate AND @endDate AND cuw.SubmittedDate <= DueDate THEN 1 END) AssignmentsCompletedOnTime 
		, COUNT(CASE WHEN cuw.FinalDueDate <= @endDate THEN 1 END) TotalAssignmentsUpUntilEndDate  
		, COUNT(CASE WHEN cuw.FinalDueDate <= @endDate AND cuw.FinalDueDate >= cuw.SubmittedDate THEN 1 END) AssignmentsCompletedUpUntilEndDate  
		, COUNT(CASE WHEN cuw.DueDate BETWEEN @startDate AND @endDate THEN 1 END) AssignmentsAssignedDateRange
	FROM Attendance.fnClassUserWork(@startDate, @endDate, @userId, @classId) cuw
	GROUP BY UserId
)