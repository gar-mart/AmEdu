-- Excludes voided interventions as default behavior as the Student Interventions screen should hide them.
CREATE PROCEDURE Attendance.ReturnInterventionsBySearch (
	@studentId INT
	, @schoolYear Common.SchoolYear
)
AS
SET NOCOUNT ON

DECLARE @Interventions TABLE (Id INT)
INSERT INTO @Interventions 
SELECT i.Id
FROM Attendance.Interventions i
INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
WHERE ef.UserId = IIF(@studentId = 0, ef.UserId, @studentId)
	AND SchoolYear = @schoolYear
	AND i.Status <> 3 -- 3: Voided

SELECT 
	Interventions.CompletedByUserId
	, Interventions.CompletedDate
	, Interventions.EngagementFlagId
	, Interventions.GeneratedByUserId
	, Interventions.GeneratedDate
	, i.Id
	, Interventions.Level
	, Interventions.LogOnly
	, Interventions.SchoolYear
	, Interventions.Status
	, ef.UserId StudentId
	, GeneratedByUserName = ISNULL(GeneratedByUser.Name, 'System')
	, CompletedByUserName = CompletedByUser.Name
	, Student.GradeLevel StudentGradeLevel
	, Student.Name StudentName
	, Mentor.Name MentorName
	, EmailExists = IIF(iec.Email IS NULL, 0, 1)
FROM Attendance.Interventions 
INNER JOIN @Interventions i ON Interventions.Id = i.Id
INNER JOIN Attendance.EngagementFlags ef ON Interventions.EngagementFlagId = ef.Id
LEFT JOIN Common.Users GeneratedByUser ON GeneratedByUserId = GeneratedByUser.Id
LEFT JOIN Common.Users CompletedByUser ON CompletedByUser.Id = CompletedByUserId
INNER JOIN Common.Users Student ON ef.UserId = Student.Id
LEFT JOIN Common.Users Mentor ON Student.MentorId = Mentor.Id
LEFT JOIN Attendance.InterventionEmailCommunications iec ON iec.InterventionId = i.Id
ORDER BY GeneratedDate DESC

SELECT 
	ec.CompletedByUserId
	, ec.CompletedDate
	, ec.InterventionId
	, ec.IsCompleted
	, ec.Email
	, CompletedByUser.Name CompletedByUserName
FROM Attendance.InterventionEmailCommunications ec
INNER JOIN @Interventions i ON ec.InterventionId = i.Id
LEFT JOIN Common.Users CompletedByUser ON CompletedByUser.Id = ec.CompletedByUserId

SELECT 
	sm.CompletedByUserId
	, sm.CompletedDate	
	, sm.InterventionId
	, sm.IsCompleted
	, sm.Status
	, sm.DateOfMeeting
	, CompletedByUser.Name CompletedByUserName
FROM Attendance.InterventionScheduledMeetings sm
INNER JOIN @Interventions i ON sm.InterventionId = i.Id
LEFT JOIN Common.Users CompletedByUser ON CompletedByUser.Id = sm.CompletedByUserId

SELECT 
	sp.CompletedByUserId
	, sp.CompletedDate	
	, sp.InterventionId
	, sp.IsCompleted
	, sp.SuccessPlanCreatedDate
	, sp.SuccessPlanNotCreated
	, CompletedByUser.Name CompletedByUserName
FROM Attendance.InterventionSuccessPlans sp
INNER JOIN @Interventions i ON sp.InterventionId = i.Id
LEFT JOIN Common.Users CompletedByUser ON CompletedByUser.Id = sp.CompletedByUserId

SELECT 
	tf.CompletedByUserId
	, tf.CompletedDate	
	, tf.InterventionId
	, tf.IsCompleted
	, tf.MarkedCompleted
	, CompletedByUser.Name CompletedByUserName
FROM Attendance.InterventionTruancyForms tf
INNER JOIN @Interventions i ON tf.InterventionId = i.Id
LEFT JOIN Common.Users CompletedByUser ON CompletedByUser.Id = tf.CompletedByUserId

SELECT 
	i.Id
	, ef.ActualCommunications
	, ef.ActualCourseHoursSpent ActualCourseHours
	, ef.ActualLiveLessons
	, ef.ApprovedStatus
	, ef.RejectedReason
	, ef.StaffId
	, ef.TargetCommunications
	, ef.TargetCourseHoursSpent TargetCourseHours
	, ef.TargetLiveLessons
	, ef.UserId
	, ef.WeekOfDate
	, ef.InterventionReason
FROM Attendance.EngagementFlags ef
INNER JOIN @Interventions i ON ef.Id = i.Id
