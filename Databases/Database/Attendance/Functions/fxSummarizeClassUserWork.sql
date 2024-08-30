CREATE FUNCTION Attendance.fxSummarizeClassUserWork (
	@startDate DATE
	, @endDate DATE
)
RETURNS @ClassUserWork TABLE(
	UserId INT
	, TotalAssignments INT
	, TotalAssignmentsDateRange INT
	, AssignmentsCompletedDateRange INT
	, AssignmentsCompleted INT
	, AssignmentsInGracePeriod INT
	, AssignmentsCompletedOnTime INT
	, TotalAssignmentsUpUntilEndDate INT
	, AssignmentsCompletedUpUntilEndDate INT
	, AssignmentsAssignedDateRange INT
)
AS 
BEGIN

INSERT INTO @ClassUserWork(
	UserId
	, TotalAssignments
	, TotalAssignmentsDateRange
	, AssignmentsCompletedDateRange
	, AssignmentsCompleted
	, AssignmentsInGracePeriod
	, AssignmentsCompletedOnTime
	, TotalAssignmentsUpUntilEndDate
	, AssignmentsCompletedUpUntilEndDate
	, AssignmentsAssignedDateRange
)
SELECT 
	UserId
	, TotalAssignments
	, TotalAssignmentsDateRange
	, AssignmentsCompletedDateRange
	, AssignmentsCompleted
	, AssignmentsInGracePeriod
	, AssignmentsCompletedOnTime
	, TotalAssignmentsUpUntilEndDate
	, AssignmentsCompletedUpUntilEndDate
	, AssignmentsAssignedDateRange
FROM Attendance.fnSummarizeClassUserWork(@startDate, @endDate, NULL, NULL)
OPTION(HASH GROUP)

RETURN 

END