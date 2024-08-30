CREATE PROCEDURE Attendance.GenerateIntervention
	@reason NVARCHAR(500)
	, @currentUserId INT
	, @studentId INT
AS
SET NOCOUNT ON

IF @reason IS NULL
	RETURN 1 -- if reason is not supplied, this proc will accidentally create the intervention as if it happened automatically

-- Create an Engagement Flag using last week's data

DECLARE @EndOfWeek DATETIME2(0)
DECLARE @StartOfWeek DATETIME2(0)

SELECT 
	@EndOfWeek = w.BeginningOfWeek
	, @StartOfWeek = DATEADD(DAY, -7, w.BeginningOfWeek)
FROM Common.GetBeginningOfWeek(NULL) w

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	DECLARE @Monday DATE = CAST(@StartOfWeek AS DATE)

	;WITH interventions AS (
		SELECT i.*
			, ef.WeekOfDate
			, ef.UserId StudentId
		FROM Attendance.Interventions i 
		INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
		WHERE YEAR(ef.WeekOfDate) - IIF(MONTH(ef.WeekOfDate) >= 7, 0, 1) = YEAR(@EndOfWeek) - IIF(MONTH(@EndOfWeek) >= 7, 0, 1)
			AND i.LogOnly = 0
			AND i.Status = 0 -- In Progress
	)
	INSERT INTO Attendance.EngagementFlags (
		UserId
		, WeekOfDate
		, ActualCommunications
		, ActualCourseHoursSpent
		, ActualLiveLessons
		, TargetCommunications
		, TargetCourseHoursSpent
		, TargetLiveLessons
		, ApprovedStatus
		, MentorId
		, GradeLevel
		, InterventionReason
		, StaffId
	)
	SELECT 
		b.Id
		, @EndOfWeek
		, d.CommunicationPoints
		, e.OnlineHours
		, c.LiveLessonPoints
		, CEILING(a.MinimumCommunicationLogs * ScaleCalculation.Scale)
		, a.MinimumCourseHoursSpent * ScaleCalculation.Scale
		, CEILING(a.MinimumLiveLessons * ScaleCalculation.Scale)
		, NULL
		, b.MentorId
		, b.GradeLevel
		, @reason
		, @currentUserId
	FROM Attendance.InterventionThresholds a
	INNER JOIN Common.Users b ON a.Grade = b.GradeLevel
	CROSS APPLY (
		SELECT COUNT(*) LiveLessonPoints
		FROM Attendance.LiveLessonPoints c
		WHERE 
			c.UserId = b.Id
			AND c.Date >= @StartOfWeek
			AND c.Date < @EndOfWeek
	) c
	CROSS APPLY (
		SELECT ISNULL(SUM(d.Value), 0) CommunicationPoints
		FROM Attendance.Points d
		WHERE
			d.UserId = b.Id
			AND d.Date >= @StartOfWeek
			AND d.Date < @EndOfWeek
			AND d.Type = 1 -- Communication
	) d
	CROSS APPLY (
		SELECT ISNULL(SUM(e.Value), 0) OnlineHours
		FROM Attendance.OnlineHours e
		WHERE
			e.UserId = b.Id
			AND e.Date >= @StartOfWeek
			AND e.Date < @EndOfWeek
	) e
	CROSS APPLY (	
		SELECT 
			CAST(BreakScale.Scale * CASE
				WHEN ClassCount.Value >= 6 THEN 1 -- 6+ classes = no scaling				
				ELSE ClassCount.Value / 6.0 -- scale out of 6
			END AS DECIMAL(7, 2)) Scale
		FROM (
			SELECT CAST((
				SELECT COUNT(*)
				FROM (
					SELECT @Monday StartDate
					UNION ALL
					SELECT DATEADD(DAY, 1, @Monday)
					UNION ALL
					SELECT DATEADD(DAY, 2, @Monday)
					UNION ALL
					SELECT DATEADD(DAY, 3, @Monday)
					UNION ALL
					SELECT DATEADD(DAY, 4, @Monday)
				) ScaleDays			
				WHERE
					-- Scale points if there was a school break
					NOT EXISTS (SELECT * FROM Common.Breaks b WHERE ScaleDays.StartDate BETWEEN b.StartDate AND b.EndDate)
					-- Scale a student's points if they had an excused absence
					AND NOT EXISTS (SELECT * FROM Attendance.Absences WHERE ScaleDays.StartDate BETWEEN Absences.StartDate AND Absences.EndDate AND b.Id = Absences.UserId)
					-- Scale a student's points if they enrolled / unenrolled mid week (if they were not enrolled at all for this week then the Scale would be 0)
					AND ScaleDays.StartDate BETWEEN b.EnrollmentDate AND ISNULL(b.UnenrollmentDate, ScaleDays.StartDate)
			) AS DECIMAL(7,2)) / 5 Scale
		) BreakScale
		CROSS APPLY (
			SELECT COUNT(DISTINCT ccu.ClassId) Value
			FROM Attendance.vwCurrentClassUsers ccu
			WHERE ccu.UserId = b.Id
		) ClassCount
	) ScaleCalculation
	WHERE b.Id = @studentId

	DECLARE @EngagementFlagId INT = SCOPE_IDENTITY()

	EXEC Attendance.UpdateEngagementFlag @currentUserId, @EngagementFlagId, 1, NULL, NULL

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH

