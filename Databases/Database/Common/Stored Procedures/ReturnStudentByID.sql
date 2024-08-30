CREATE PROCEDURE Common.ReturnStudentById (
	@userId INT
	, @lastWeekTotals BIT = 0
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
	SELECT DATEADD(WEEK, IIF(@lastWeekTotals = 1, -1, 0), BeginningOfWeek) 
	FROM Common.GetBeginningOfWeek(DEFAULT)
)
DECLARE @EndOfWeek DATETIME2(0) = DATEADD(WEEK, 1, @BeginningOfWeek)


SELECT
	  a.Id
	, a.Name
	, a.GradeLevel
	, a.OrientationStartTime
	, a.Email
	, a.Email StudentEmail
	, j.Picture StudentPicture
	, b.Id MentorId
	, b.Name MentorName
	, b.Email MentorEmail
	, b.ProfilePicture MentorPicture
	, b.AppointmentLink MentorAppointmentLink
	, c.AppointmentLink SecondaryMentorAppointmentLink
	, IIF(d.TotalSteps = 0, 0, f.CompletedSteps * 1.0 / d.TotalSteps) ProgressPercent
	, f.CompletedSteps
	, d.TotalSteps
	, (48*60 - DATEDIFF(MINUTE, a.OrientationStartTime, SYSDATETIME())) / 60 HoursRemaining
	, (48*60 - DATEDIFF(MINUTE, a.OrientationStartTime, SYSDATETIME())) % 60 MinutesRemaining
	, a.SecondaryMentorId
	, c.Name SecondaryMentorName
	, c.Email SecondaryMentorEmail
	, c.ProfilePicture SecondaryMentorPicture
	, CASE 
		WHEN cs.WayToReachAsStudent = 1 THEN 'Email'
		WHEN cs.WayToReachAsStudent = 2 THEN 'Phone'
		WHEN cs.WayToReachAsStudent = 3 THEN 'Text'
	 END PreferredContactMethod
	, cs.ContactAsStudentInfo as PreferredContactInfo
	, i.CumulativePoints
	, k.PointBalance
	, l.StewardshipPoints
	, m.IntegrityPoints
	, n.CommunicationPoints
	, o.LiveLessonPoints
	, p.OnlineHoursSpent
	, q.RespectPoints
	, r.EngagementPoints
	, s.TotalCommunicationPoints
	, t.TotalLiveLessonPoints
	, u.PointsSpent
FROM Common.Users a
LEFT JOIN Common.Users b ON a.MentorId = b.Id
LEFT JOIN Common.Users c ON a.SecondaryMentorId = c.Id
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
LEFT JOIN Orientation.Step_SendUsASelfie j ON a.Id = j.UserId
LEFT JOIN Orientation.Step_ConnectionSurvey cs on a.Id = cs.UserId
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
		AND (
			@lastWeekTotals = 0
			OR l1.Date BETWEEN @BeginningOfWeek AND @EndOfWeek
		)
) l
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) IntegrityPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @IntegrityPointType
		AND (
			@lastWeekTotals = 0
			OR l1.Date BETWEEN @BeginningOfWeek AND @EndOfWeek
		)
) m
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) CommunicationPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @CommunicationPointType
		AND l1.Date BETWEEN @BeginningOfWeek AND @EndOfWeek
) n
CROSS APPLY (
	SELECT COUNT(*) LiveLessonPoints
	FROM Attendance.LiveLessonPoints o1
	WHERE o1.UserId = a.Id
		AND o1.Date BETWEEN @BeginningOfWeek AND @EndOfWeek
) o
CROSS APPLY (
	SELECT SUM(p.Value) OnlineHoursSpent
	FROM Attendance.OnlineHours p
	WHERE p.UserId = a.Id
		AND p.Date BETWEEN @BeginningOfWeek AND @EndOfWeek
) p
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) RespectPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @RespectPointType
		AND (
			@lastWeekTotals = 0
			OR l1.Date BETWEEN @BeginningOfWeek AND @EndOfWeek
		)
) q
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) EngagementPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @EngagementPointType
		AND (
			@lastWeekTotals = 0
			OR l1.Date BETWEEN @BeginningOfWeek AND @EndOfWeek
		)
) r
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) TotalCommunicationPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @CommunicationPointType
		AND (
			@lastWeekTotals = 0
			OR l1.Date BETWEEN @BeginningOfWeek AND @EndOfWeek
		)
) s
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) TotalLiveLessonPoints
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @LiveLessonPointType
		AND (
			@lastWeekTotals = 0
			OR l1.Date BETWEEN @BeginningOfWeek AND @EndOfWeek
		)
) t
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) PointsSpent
	FROM Attendance.vwCurrentPoints l1
	WHERE l1.UserId = a.Id
		AND l1.Type = @SpendPointType
		AND (
			@lastWeekTotals = 0
			OR l1.Date BETWEEN @BeginningOfWeek AND @EndOfWeek
		)
) u
WHERE a.Id = @userId
