CREATE PROCEDURE Attendance.ReturnEngagementFlagsByStudentId (
	@studentId INT
	, @schoolYear Common.SchoolYear = NULL
	, @acknowledgedByStudent BIT = NULL
)
AS
SET NOCOUNT ON

SELECT
	ef.ActualCommunications
	, ROUND(ef.ActualCourseHoursSpent, 2) ActualCourseHours
	, ef.ActualLiveLessons
	, ef.ApprovedStatus
	, ef.Id
	, ef.RejectedReason
	, ef.InterventionReason
	, ef.TargetCommunications
	, ef.TargetCourseHoursSpent TargetCourseHours
	, ef.TargetLiveLessons
	, ef.UserId
	, ef.StaffId
	, ef.WeekOfDate
	, staff.Name StaffName
FROM Attendance.EngagementFlags ef
LEFT JOIN Common.Users staff ON ef.StaffId = staff.Id
WHERE
	ef.UserId = @studentId
	AND (
		@schoolYear IS NULL
		OR YEAR(ef.WeekOfDate) - IIF(MONTH(ef.WeekOfDate) >= 7, 0, 1) = @schoolYear
	)	
	AND (
		@acknowledgedByStudent IS NULL
		OR @acknowledgedByStudent = ef.AcknowledgedByStudent
		AND ef.ApprovedStatus = 1
	)
ORDER BY
	ef.WeekOfDate DESC
