CREATE PROCEDURE Attendance.GenerateEngagementFlags (
	@startOfWeek DATETIME2(0) -- startOfWeek and endOfWeek are expected to be Monday at midnight values as they are start and end of "engagementFlag" weeks
	, @endOfWeek DATETIME2(0)
)
AS
SET NOCOUNT ON

BEGIN TRY
	SET XACT_ABORT ON
	BEGIN TRANSACTION

	DECLARE @EngagementFlagTable TABLE (
		Id INT NOT NULL
		, WeekOfDate DATE NOT NULL -- Ending date column 
		, ActualCommunications INT NOT NULL
		, TargetCommunications INT NULL
		, ActualLiveLessons INT NOT NULL
		, TargetLiveLessons INT NULL
		, ActualCourseHoursSpent DECIMAL(8, 5) NOT NULL
		, TargetCourseHoursSpent DECIMAL(5, 2) NULL
		, UserId INT NOT NULL
		, ApprovedStatus BIT NULL
	)

	DECLARE @Monday DATE = CAST(@startOfWeek AS DATE)

	;WITH interventions AS (
		SELECT i.*
			, ef.WeekOfDate
			, ef.UserId StudentId
		FROM Attendance.Interventions i 
		INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
		WHERE YEAR(ef.WeekOfDate) - IIF(MONTH(ef.WeekOfDate) >= 7, 0, 1) = YEAR(@endOfWeek) - IIF(MONTH(@endOfWeek) >= 7, 0, 1)
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
	)
	OUTPUT
		INSERTED.Id
		, INSERTED.WeekOfDate
		, INSERTED.ActualCommunications
		, INSERTED.TargetCommunications
		, INSERTED.ActualLiveLessons
		, INSERTED.TargetLiveLessons
		, INSERTED.ActualCourseHoursSpent
		, INSERTED.TargetCourseHoursSpent
		, INSERTED.UserId
		, INSERTED.ApprovedStatus
	INTO @EngagementFlagTable
	SELECT 
		s.Id
		, @endOfWeek
		, communications.CommunicationPoints
		, hours.OnlineHours
		, liveLessons.LiveLessonPoints
		, CEILING(it.MinimumCommunicationLogs * ScaleCalculation.Scale)
		, it.MinimumCourseHoursSpent * ScaleCalculation.Scale
		, CEILING(it.MinimumLiveLessons * ScaleCalculation.Scale)
		, ApprovedStatusCalculation.Value
		, s.MentorId
		, s.GradeLevel
	FROM Attendance.InterventionThresholds it
	INNER JOIN Common.vwUsers s ON it.Grade = s.GradeLevel
	CROSS APPLY (
		SELECT COUNT(*) LiveLessonPoints
		FROM Attendance.LiveLessonPoints llp
		WHERE 
			llp.UserId = s.Id
			AND llp.Date >= @startOfWeek
			AND llp.Date < @endOfWeek
	) liveLessons
	CROSS APPLY (
		SELECT ISNULL(SUM(p.Value), 0) CommunicationPoints
		FROM Attendance.Points p
		WHERE
			p.UserId = s.Id
			AND p.Date >= @startOfWeek
			AND p.Date < @endOfWeek
			AND p.Type = 1 -- Communication
	) communications
	CROSS APPLY (
		SELECT ISNULL(SUM(oh.Value), 0) OnlineHours
		FROM Attendance.OnlineHours oh
		WHERE
			oh.UserId = s.Id
			AND oh.Date >= @startOfWeek
			AND oh.Date < @endOfWeek
	) hours
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
					AND NOT EXISTS (SELECT * FROM Attendance.Absences WHERE ScaleDays.StartDate BETWEEN Absences.StartDate AND Absences.EndDate AND s.Id = Absences.UserId)
					-- Scale a student's points if they enrolled / unenrolled mid week (if they were not enrolled at all for this week then the Scale would be 0)
					AND ScaleDays.StartDate BETWEEN s.EnrollmentDate AND ISNULL(s.UnenrollmentDate, ScaleDays.StartDate)
			) AS DECIMAL(7,2)) / 5 Scale
		) BreakScale
		CROSS APPLY (
			SELECT COUNT(DISTINCT ccu.ClassId) Value
			FROM Attendance.vwCurrentClassUsers ccu
			WHERE ccu.UserId = s.Id
		) ClassCount
	) ScaleCalculation
	CROSS APPLY (
		SELECT (
			CASE WHEN CEILING(it.MinimumLiveLessons * ScaleCalculation.Scale) <= liveLessons.LiveLessonPoints THEN 1 ELSE 0 END +
			CASE WHEN CEILING(it.MinimumCommunicationLogs * ScaleCalculation.Scale) <= communications.CommunicationPoints THEN 1 ELSE 0 END +
			CASE WHEN it.MinimumCourseHoursSpent * ScaleCalculation.Scale <= hours.OnlineHours THEN 1 ELSE 0 END 
		) RequirementsMet
		, IIF(it.MinimumCommunicationLogs IS NULL, 0, 1) 
		+ IIF(it.MinimumCourseHoursSpent  IS NULL, 0, 1)
		+ IIF(it.MinimumLiveLessons       IS NULL, 0, 1) PossibleRequirementsToMeet
	) r
	CROSS APPLY (
		SELECT Value = CASE
			WHEN DATEDIFF(DAY, (
				SELECT MAX(sp.SuccessPlanCreatedDate) 
				FROM Attendance.InterventionSuccessPlans sp
				INNER JOIN interventions ON sp.InterventionId = interventions.Id 
				WHERE interventions.StudentId = s.Id
			), CAST(Common.CurrentEasternTime() AS DATE)) <= 14 THEN 1 -- A success plan was created within the last 14 days (or in the future)
			WHEN (
				SELECT MAX(sm.DateOfMeeting)
				FROM Attendance.InterventionScheduledMeetings sm
				INNER JOIN interventions ON sm.InterventionId = interventions.Id
				WHERE interventions.StudentId = s.Id
			) >= CAST(Common.CurrentEasternTime() AS DATE) THEN 1 -- A schedule meeting has been made for a date in the future (or for today)			
		END 
	) ApprovedStatusCalculation
	WHERE 
		s.IsActive = 1
		AND s.IsStaff = 0
		-- Did the student meet the requirements?
		-- Make sure the number of requirements to meet doesn't exceed the possible requirements
		AND r.RequirementsMet < LEAST(r.PossibleRequirementsToMeet, it.NumberOfRequirements) 
		

	-- Log auto-approved engagement flags into the intervention table
	INSERT INTO Attendance.Interventions (Id, CompletedByUserId, GeneratedByUserId, CompletedDate, GeneratedDate, Level, LogOnly, SchoolYear, Status)
	SELECT 
		e.Id
		, NULL -- System
		, NULL -- System
		, SYSUTCDATETIME()
		, SYSUTCDATETIME()
		, (
			SELECT MAX(i.Level) 
			FROM Attendance.Interventions i 
			INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id 
			WHERE ef.UserId = e.UserId 
				AND i.Status = 0
		)
		, 1
		, Common.GetSchoolYear(e.WeekOfDate)
		, 1
	FROM @EngagementFlagTable e
	WHERE e.ApprovedStatus IS NOT NULL

	SELECT 
		a.ActualCommunications
		, ROUND(a.ActualCourseHoursSpent, 2) ActualCourseHours
		, a.ActualLiveLessons
		, a.Id
		, a.TargetCommunications
		, a.TargetCourseHoursSpent TargetCourseHours
		, a.TargetLiveLessons
		, a.UserId
		, a.WeekOfDate
		, b.Name StudentName
		, c.Email MentorEmail
		, c.Name MentorName
	FROM @EngagementFlagTable a
	INNER JOIN Common.Users b ON a.UserId = b.Id
	INNER JOIN Common.Users c ON b.MentorId = c.Id
	WHERE a.ApprovedStatus IS NULL -- only alert mentors of engagement flags they need to take action on

	COMMIT TRANSACTION
END TRY

BEGIN CATCH
	IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
	THROW;
END CATCH

