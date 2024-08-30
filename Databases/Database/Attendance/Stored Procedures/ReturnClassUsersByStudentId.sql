CREATE PROCEDURE Attendance.ReturnClassUsersByStudentId (
	@studentId INT
	, @startDate DATE OUTPUT
	, @endDate DATE OUTPUT
)
AS
SET NOCOUNT ON

DECLARE @DownwardsTrend INT = -1
	, @FlatTrend INT = 0
	, @UpwardsTrend INT = 1
	, @TrendThreshold INT = 2 -- if a score changes by less than 2%, show a flat trend

DECLARE @IsCurrent BIT 

IF @startDate IS NULL
	SELECT
		@endDate = DATEADD(D, -1, FromDateTime)
		, @startDate = BeginningOfWeek
		, @IsCurrent = IIF(CAST(SYSUTCDATETIME() AS DATE) BETWEEN BeginningOfWeek AND FromDateTime, 1, 0)
	FROM Common.GetBeginningOfWeek(@endDate)
ELSE 
	SET @IsCurrent = IIF(CAST(SYSUTCDATETIME() AS DATE) BETWEEN @startDate AND @endDate, 1, 0)

;WITH StudentScores AS (
	-- get student scores closest to @endDate
	SELECT *
	FROM (
		SELECT 
			*
			, ROW_NUMBER() OVER (PARTITION BY ClassId ORDER BY ABS(DATEDIFF(DAY, AsOfDate, @endDate))) RN
		FROM Student.ScoreHistory
		WHERE StudentId = @studentId
	) a
	WHERE RN = 1
)
SELECT
	a.ClassId
	, a.ConnexusId
	, a.LincolnLearningId
	, a.FlexPointId
	, Scores.Score
	, Scores.ScoreAchieved
	, Scores.ScorePossible
	, ISNULL(f.Trend, @FlatTrend) Trend
	, TrendDifference
	, a.TotalSecondsSpentOnline
	, a.UserId
	, b.Name ClassName
	, c.OnlineHoursSpentThisWeek
	, d.LiveLessonPoints
	, a.Status
	, IIF(@IsCurrent = 1, a.AsOfDate, e.AsOfDate) AsOfDate
	, ClassUserWork.AssignmentsCompleted
	, ClassUserWork.AssignmentsCompletedDateRange
	, ClassUserWork.AssignmentsInGracePeriod
	, ClassUserWork.TotalAssignments
	, ClassUserWork.TotalAssignmentsDateRange
	, ClassUserWork.AssignmentsCompletedOnTime
	, ClassUserWork.TotalAssignmentsUpUntilEndDate
	, ClassUserWork.AssignmentsCompletedUpUntilEndDate 
	, ClassUserWork.AssignmentsAssignedDateRange
	, LiveLessonsOffered.Total LiveLessonsOffered
FROM Attendance.vwClassUsers a
INNER JOIN Attendance.vwClasses b ON a.ClassId = b.Id
CROSS APPLY (
	SELECT ISNULL(SUM(c.Value), 0) OnlineHoursSpentThisWeek
	FROM Attendance.OnlineHours c
	WHERE a.UserId = c.UserId 
		AND a.ClassId = c.ClassId
		AND c.Date >= @startDate
		AND c.Date < DATEADD(D, 1, @endDate)
) c
CROSS APPLY (
	SELECT COUNT(*) LiveLessonPoints 
	FROM Attendance.LiveLessonPoints d
	WHERE a.ClassId = d.ClassId
		AND a.UserId = d.UserId
		AND d.Date >= @startDate
		AND d.Date < DATEADD(D, 1, @endDate)
) d
CROSS APPLY (
	SELECT COUNT(*) Total	
	FROM ( 
		SELECT llp.ClassId, llp.Date
		FROM Attendance.LiveLessonPoints llp
		WHERE CAST(llp.Date AS DATE) BETWEEN @startDate AND @endDate
			AND llp.ClassId = a.ClassId
			AND NOT EXISTS (
				-- exclude live lessons that the user was excused (note, we are not also checking school breaks because there should be no live lessons offered on those days anyway)
				SELECT *
				FROM Attendance.Absences a
				WHERE a.UserId = @studentId
					AND CAST(llp.Date AS DATE) BETWEEN a.StartDate AND a.EndDate
			)
		GROUP BY llp.ClassId, llp.Date
	) LiveLessonsOffered
) LiveLessonsOffered
LEFT JOIN StudentScores e ON a.ClassId = e.ClassId
CROSS APPLY (
	-- don't use snapshot if retrieving current score
	SELECT IIF(e.Score IS NULL OR @IsCurrent = 1, a.Score, e.Score) Score
		, IIF(e.Score IS NULL OR @IsCurrent = 1, a.ScoreAchieved, e.ScoreAchieved) ScoreAchieved
		, IIF(e.Score IS NULL OR @IsCurrent = 1, a.ScorePossible, e.ScorePossible) ScorePossible
		, IIF(e.Score IS NULL OR @IsCurrent = 1, a.ScoreRatio, e.ScoreRatio) ScoreRatio
) Scores
OUTER APPLY (
	SELECT TOP 1 
		CASE 
			WHEN Scores.ScoreRatio <= f.ScoreRatio - @TrendThreshold THEN 
			    @DownwardsTrend

			WHEN Scores.ScoreRatio >= f.ScoreRatio + @TrendThreshold THEN 
				@UpwardsTrend

			ELSE 
				@FlatTrend
		END Trend
		, ABS(f.ScoreRatio - Scores.ScoreRatio) TrendDifference
	FROM Student.ScoreHistory f
	WHERE f.ClassId = a.ClassId 
		AND f.StudentId = a.UserId
		AND CAST(f.AsOfDate AS DATE) < CAST(e.AsOfDate AS DATE)
	ORDER BY f.AsOfDate DESC
) f
OUTER APPLY Attendance.fnSummarizeClassUserWork(@startDate, @endDate, a.UserId, a.ClassId) ClassUserWork
WHERE 
	a.UserId = @studentId 
	AND (
		b.StartDate <= @startDate 
		AND @endDate <= b.EndDate
		OR @startDate <= b.StartDate
		AND b.StartDate <= @endDate
		OR @startDate <= b.EndDate
		AND b.EndDate <= @endDate
	)
	AND (
		ISNULL(a.StartDate, @startDate) <= @startDate 
		AND @endDate <= ISNULL(a.EndDate, @endDate)
		OR @startDate <= ISNULL(a.StartDate, @startDate)
		AND ISNULL(a.StartDate, @endDate) <= @endDate
		OR @startDate <= ISNULL(a.EndDate, @startDate)
		AND ISNULL(a.EndDate, @endDate) <= @endDate
	)
	AND a.IsDeleted = 0
	AND b.IsDeleted = 0
	AND (
		-- only return snapshot data if not using current data
		e.AsOfDate IS NOT NULL OR 
		@IsCurrent = 1
	)
ORDER BY 
	a.Status -- Active = 1, so active classes get shown first when other statuses are shown as well
	, b.Name
	