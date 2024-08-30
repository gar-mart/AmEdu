CREATE PROCEDURE Attendance.ReturnInterventionThresholds 
AS
SET NOCOUNT ON
	
SELECT 
	a.Grade
	, a.Id
	, a.MinimumCommunicationLogs
	, a.MinimumCourseHoursSpent
	, a.MinimumLiveLessons
	, a.ExpectedCommunicationLogs
	, a.ExpectedLiveLessons
	, a.NumberOfRequirements
FROM Attendance.InterventionThresholds a
ORDER BY Id -- records are created in ascending order from K-12