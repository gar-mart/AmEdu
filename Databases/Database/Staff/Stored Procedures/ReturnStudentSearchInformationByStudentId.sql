CREATE PROCEDURE Staff.ReturnStudentSearchInformationById (
	@currentUserId INT
	, @id INT
)
AS
SET NOCOUNT ON

DECLARE @CommunicationPointType TINYINT = 1
	, @IntegrityPointType TINYINT = 2
	, @StewardshipPointType TINYINT = 3
	, @SpendPointType TINYINT = 4
	, @LiveLessonPointType TINYINT = 5
	, @RespectPointType TINYINT = 6
	, @EngagementPointType TINYINT = 7

DECLARE @BeginningOfWeek DATETIME2(0) = (
	SELECT BeginningOfWeek
	FROM Common.GetBeginningOfWeek(DEFAULT)
)

SELECT
	  a.Id
	, a.LincolnLearningId
	, a.FlexPointId
	, a.LastName + ', ' + a.FirstName Name
	, a.FirstName
	, a.LastName
	, a.GradeLevel
	, a.OrientationStartTime
	, a.OrientationFinishTime
	, a.EnrollmentDate
	, a.UnenrollmentDate
	, info.Notes
	, b.Id MentorId
	, b.Name MentorName
	, b.Email MentorEmail
	, IIF(d.TotalSteps = 0, 0, f.CompletedSteps * 1.0 / d.TotalSteps) ProgressPercent
	, f.CompletedSteps
	, d.TotalSteps
	, (48*60 - DATEDIFF(MINUTE, a.OrientationStartTime, SYSDATETIME())) / 60 HoursRemaining
	, (48*60 - DATEDIFF(MINUTE, a.OrientationStartTime, SYSDATETIME())) % 60 MinutesRemaining	
	--, IIF(c.Picture IS NULL, 0, 1) HasStudentPicture
	, a.Email StudentEmail
	, a.SecondaryMentorId
	, j.Name SecondaryMentorName
	, CASE WHEN h.HasStudents = 0 OR @currentUserId IN (a.MentorId, a.SecondaryMentorId) THEN 1 ELSE 0 END IsMyStudent
	, i.CumulativePoints
	, k.PointBalance
	, l.StewardshipPoints
	, m.IntegrityPoints
	, n.CommunicationPoints
	, o.LiveLessonPoints
	, p.MissedLastWeeksRequirements
	, q.RespectPoints
	, r.EngagementPoints
	, s.TotalCommunicationPoints
	, t.TotalLiveLessonPoints
	-- guardian contact info
	, ISNULL(info.GuardianName, cs.GuardianName) GuardianName
	, CASE WHEN info.PreferredWayToContactGuardian = 1 THEN 'Email' WHEN info.PreferredWayToContactGuardian = 2 THEN 'Phone' WHEN info.PreferredWayToContactGuardian = 3 THEN 'Text' WHEN cs.WayToContactAsGuardian = 1 THEN 'Email' WHEN cs.WayToContactAsGuardian = 2 THEN 'Phone' WHEN cs.WayToContactAsGuardian = 3 THEN 'Text' END PreferredWayToContactGuardian 
	, CASE WHEN info.BestTimeToReachGuardian = 1 THEN 'Morning' WHEN info.BestTimeToReachGuardian = 2 THEN 'Afternoon' WHEN info.BestTimeToReachGuardian = 3 THEN 'Evening' WHEN cs.BestTimeToReachAsGuardian = 1 THEN 'Morning' WHEN cs.BestTimeToReachAsGuardian = 2 THEN 'Afternoon' WHEN cs.BestTimeToReachAsGuardian = 3 THEN 'Evening' END BestTimeToReachGuardian 
	, ISNULL(info.GuardianEmailAddress, cs.GuardianEmailAddress) GuardianEmailAddress
	, ISNULL(info.GuardianPhoneNumber, cs.GuardianPhoneNumber) GuardianPhoneNumber
	, ISNULL(info.GuardianIsSubscribedToWeeklySnapshotEmail, cs.GuardianIsSubscribedToWeeklySnapshotEmail) GuardianIsSubscribedToWeeklySnapshotEmail
	-- secondary guardian contact info
	, ISNULL(info.SecondaryGuardianName, cs.SecondaryGuardianName) SecondaryGuardianName
	, ISNULL(info.SecondaryGuardianEmailAddress, cs.SecondaryGuardianEmailAddress) SecondaryGuardianEmailAddress
	, ISNULL(info.SecondaryGuardianPhoneNumber, cs.SecondaryGuardianPhoneNumber) SecondaryGuardianPhoneNumber
	, info.SecondaryGuardianIsSubscribedToWeeklySnapshotEmail -- not available on cs table
	-- student contact info
	, CASE WHEN info.PreferredWayToContactStudent = 1 THEN 'Email' WHEN info.PreferredWayToContactStudent = 2 THEN 'Phone' WHEN info.PreferredWayToContactStudent = 3 THEN 'Text' WHEN cs.WayToReachAsStudent = 1 THEN 'Email' WHEN cs.WayToReachAsStudent = 2 THEN 'Phone' WHEN cs.WayToReachAsStudent = 3 THEN 'Text' END PreferredWayToContactStudent 
	, CASE WHEN info.BestTimeToReachStudent = 1 THEN 'Morning' WHEN info.BestTimeToReachStudent = 2 THEN 'Afternoon' WHEN info.BestTimeToReachStudent = 3 THEN 'Evening' END BestTimeToReachStudent
	, ISNULL(info.HomeAddress, cs.HomeAddress) HomeAddress
	, ISNULL(info.City, cs.City) City
	, ISNULL(info.[State], cs.[State]) [State]
	, ISNULL(info.ZipCode, cs.ZipCode) ZipCode
	, ISNULL(info.NotesAboutMe, cs.NotesAboutMe) NotesAboutMe
	, ISNULL(info.StudentEmailAddress, cs.StudentEmailAddress) StudentPersonalEmailAddress
	, ISNULL(info.StudentPhoneNumber, cs.StudentPhoneNumber) StudentPhoneNumber
	, ISNULL(info.GuardianRelationship, cs.GuardianRelationship) GuardianRelationship
	, ISNULL(info.SecondaryGuardianRelationship, cs.SecondaryGuardianRelationship) SecondaryGuardianRelationship
	, ISNULL(info.StudentBirthday, cs.StudentBirthday) StudentBirthday
	, a.Accomodations
	, a.HasAccomodations
	, intervention.Level InterventionLevel
	, intervention.Status InterventionStatus
FROM Common.Users a
LEFT JOIN Common.Users b ON a.MentorId = b.Id
LEFT JOIN Common.Users j ON a.SecondaryMentorId = j.Id
LEFT JOIN Orientation.Step_ConnectionSurvey cs on a.Id = cs.UserId
LEFT JOIN Student.Information info ON a.Id = info.StudentId
OUTER APPLY (
	SELECT TOP 1 i.*
	FROM Attendance.Interventions i
	INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
	WHERE i.LogOnly = 0
		AND Common.CurrentSchoolYear() = YEAR(ef.WeekOfDate) - IIF(MONTH(ef.WeekOfDate) >= 7, 0, 1)
		AND ef.UserId = a.Id
		AND i.Status <> 3 -- 3: Voided
	ORDER BY i.GeneratedDate DESC
) intervention 
CROSS APPLY(
	SELECT COUNT(*) TotalSteps 
	FROM Orientation.vwStudentSteps c
	WHERE c.UserId = a.Id
		AND c.IsActive = 1
) d
CROSS APPLY(
	SELECT COUNT(*) CompletedSteps 
	FROM Orientation.CompletedSteps e 
	INNER JOIN Orientation.StepGradeLevel g ON g.GradeLevel = a.GradeLevel AND e.StepId = g.StepId
	INNER JOIN Orientation.Steps i ON e.StepId = i.Id AND i.IsActive = 1
	WHERE e.UserId = a.Id 
) f
CROSS APPLY (
	SELECT HasStudents = IIF(EXISTS(
		SELECT * 
		FROM Common.Users h1 
		WHERE h1.MentorId = @currentUserId
			OR h1.SecondaryMentorId = @currentUserId
	), 1, 0) 
) h
CROSS APPLY (
	SELECT ISNULL(SUM(i1.Value), 0) CumulativePoints 
	FROM Attendance.vwCurrentPoints i1
	WHERE 
		i1.UserId = a.Id 
		AND i1.Type <> @SpendPointType
) i
CROSS APPLY (
	SELECT ISNULL(SUM(j1.Value), 0) PointBalance 
	FROM Attendance.vwCurrentPoints j1
	WHERE j1.UserId = a.Id
) k
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) StewardshipPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @StewardshipPointType
) l
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) IntegrityPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @IntegrityPointType
) m
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) CommunicationPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @CommunicationPointType
		AND l1.Date >= @BeginningOfWeek
) n
CROSS APPLY (
	SELECT COUNT(*) LiveLessonPoints
	FROM Attendance.LiveLessonPoints o1
	WHERE o1.UserId = a.Id
		AND o1.Date >= @BeginningOfWeek
) o
CROSS APPLY (
	SELECT MissedLastWeeksRequirements = IIF(
		EXISTS (
			SELECT *
			FROM Attendance.vwCurrentEngagementFlags p
			WHERE 
				p.UserId = a.Id
				AND p.WeekOfDate = CAST(@BeginningOfWeek AS DATE)
		), 1, 0)  
) p
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) RespectPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @RespectPointType
) q
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) EngagementPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @EngagementPointType
) r
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) TotalCommunicationPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @CommunicationPointType
) s
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) TotalLiveLessonPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @LiveLessonPointType
) t
WHERE a.Id = @id