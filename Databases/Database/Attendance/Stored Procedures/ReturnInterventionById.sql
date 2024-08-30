CREATE PROCEDURE Attendance.ReturnInterventionById
	@id INT
AS
SET NOCOUNT ON

SELECT 
	i.CompletedByUserId
	, i.CompletedDate
	, i.EngagementFlagId
	, i.GeneratedByUserId
	, i.GeneratedDate
	, i.Id
	, i.Level
	, i.LogOnly
	, i.SchoolYear
	, i.Status
	, StudentId = ef.UserId 
	, GeneratedByUserName = ISNULL(GeneratedByUser.Name, 'System')
	, CompletedByUserName = CompletedByUser.Name
FROM Attendance.Interventions i
INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = i.Id
LEFT JOIN Common.Users GeneratedByUser ON GeneratedByUserId = GeneratedByUser.Id
LEFT JOIN Common.Users CompletedByUser ON CompletedByUser.Id = CompletedByUserId
WHERE i.Id = @id
ORDER BY GeneratedDate DESC

SELECT 
	CompletedByUserId
	, CompletedDate
	, InterventionId
	, IsCompleted
	, InterventionEmailCommunications.Email
	, CompletedByUser.Name CompletedByUserName
FROM Attendance.InterventionEmailCommunications 
LEFT JOIN Common.Users CompletedByUser ON CompletedByUser.Id = CompletedByUserId
WHERE InterventionId = @id

SELECT 
	CompletedByUserId
	, CompletedDate	
	, InterventionId
	, IsCompleted
	, Status
	, DateOfMeeting
	, CompletedByUser.Name CompletedByUserName
FROM Attendance.InterventionScheduledMeetings 
LEFT JOIN Common.Users CompletedByUser ON CompletedByUser.Id = CompletedByUserId
WHERE InterventionId = @id

SELECT 
	CompletedByUserId
	, CompletedDate	
	, InterventionId
	, IsCompleted
	, SuccessPlanCreatedDate
	, SuccessPlanNotCreated
	, CompletedByUser.Name CompletedByUserName
FROM Attendance.InterventionSuccessPlans 
LEFT JOIN Common.Users CompletedByUser ON CompletedByUser.Id = CompletedByUserId
WHERE InterventionId = @id

SELECT 
	CompletedByUserId
	, CompletedDate	
	, InterventionId
	, IsCompleted
	, MarkedCompleted
	, CompletedByUser.Name CompletedByUserName
FROM Attendance.InterventionTruancyForms 
LEFT JOIN Common.Users CompletedByUser ON CompletedByUser.Id = CompletedByUserId
WHERE InterventionId = @id

SELECT 
	Id
	, ActualCommunications
	, ActualCourseHoursSpent ActualCourseHours
	, ActualLiveLessons
	, ApprovedStatus
	, RejectedReason
	, StaffId
	, TargetCommunications
	, TargetCourseHoursSpent TargetCourseHours
	, TargetLiveLessons
	, UserId
	, WeekOfDate
	, InterventionReason
FROM Attendance.EngagementFlags
WHERE Id = @id