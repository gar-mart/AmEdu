CREATE PROCEDURE Attendance.ReturnEngagementFlagNotifications (
	@currentUserId INT
)
AS
SET NOCOUNT ON
	
SELECT 
	a.ActualCommunications
	, ROUND(a.ActualCourseHoursSpent, 2) ActualCourseHours
	, a.ActualLiveLessons
	, a.ApprovedStatus
	, a.Id
	, a.RejectedReason
	, a.TargetCommunications
	, a.TargetCourseHoursSpent TargetCourseHours
	, a.TargetLiveLessons
	, a.UserId
	, a.WeekOfDate
	, b.Name StudentName
FROM Attendance.vwCurrentEngagementFlags a
INNER JOIN Common.vwUsers b ON a.UserId = b.Id
WHERE
	a.ApprovedStatus IS NULL
	AND b.IsActive = 1
	AND (
		b.MentorId = @currentUserId
		OR EXISTS (
			SELECT *
			FROM Common.Users a
			WHERE 
				a.Id = @currentUserId
				AND b.IsStaff = 1
		)
	)
ORDER BY
	a.WeekOfDate
	, b.LastName
