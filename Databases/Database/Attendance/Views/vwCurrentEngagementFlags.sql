CREATE VIEW Attendance.vwCurrentEngagementFlags
AS 
SELECT 
	Id 
	, WeekOfDate 
	, ActualCommunications 
	, TargetCommunications 
	, ActualLiveLessons 
	, TargetLiveLessons 
	, ActualCourseHoursSpent 
	, TargetCourseHoursSpent 
	, ApprovedStatus 
	, RejectedReason 
	, InterventionReason 
	, UserId 
	, StaffId 
	, GradeLevel 
	, MentorId 
	, AcknowledgedByStudent 
FROM Attendance.EngagementFlags
WHERE 1 = IIF(
	Common.CurrentSchoolYear() = YEAR(EngagementFlags.WeekOfDate) - IIF(MONTH(EngagementFlags.WeekOfDate) >= 7, 0, 1)
	, 1
	, 0
)



