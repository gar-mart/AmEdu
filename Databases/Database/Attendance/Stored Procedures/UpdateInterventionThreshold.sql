CREATE PROCEDURE Attendance.UpdateInterventionThreshold (
	@id INT
	, @minimumCommunicationLogs INT
	, @minimumCourseHoursSpent DECIMAL(5, 2)
	, @minimumLiveLessons INT
	, @expectedCommunicationLogs INT
	, @expectedLiveLessons INT
	, @numberOfRequirements INT
)
AS
SET NOCOUNT ON
	
UPDATE Attendance.InterventionThresholds SET 
	MinimumCommunicationLogs = @minimumCommunicationLogs
	, MinimumCourseHoursSpent = @minimumCourseHoursSpent
	, MinimumLiveLessons = @minimumLiveLessons
	, ExpectedCommunicationLogs = @expectedCommunicationLogs
	, ExpectedLiveLessons = @expectedLiveLessons
	, NumberOfRequirements = @numberOfRequirements
WHERE 
	Id = @id
