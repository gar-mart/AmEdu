CREATE PROCEDURE Staff.ReturnEngagementMetricData (
	@studentId INT
	, @metric NVARCHAR(50) -- liveLessonPoints, communicationPoints, onlineHoursSpent, failingGrades, assignmentsCompletedDateRange, assignmentsCompletedOnTime, assignmentsCompleted, assignmentsInGracePeriod
	, @startDate DATE
	, @endDate DATE
)
AS
SET NOCOUNT ON
	
IF @metric = 'liveLessonPoints'
BEGIN
	-- Columns
	SELECT 'Class' Title, 'column1' Property UNION
	SELECT 'Date', 'column2' UNION
	SELECT 'Attendance', 'column3'
	ORDER BY Property

	-- Data
	SELECT 
		c.Name Column1
		, FORMAT(llo.Date, 'M/d/yy') Column2
		, IIF(llp.UserId IS NULL, 'Absent', 'Present') Column3
	FROM Staff.fnLiveLessonsOffered(@studentId, @startDate, @endDate) llo
	INNER JOIN Attendance.Classes c ON llo.ClassId = c.Id
	LEFT JOIN Attendance.LiveLessonPoints llp ON llo.ClassId = llp.ClassId AND llo.Date = llp.Date AND llp.UserId = @studentId
	ORDER BY llo.Date 
END
ELSE IF @metric = 'communicationPoints' 
BEGIN
	-- Columns
	SELECT 'Date' Title, 'column1' Property UNION
	SELECT 'Staff', 'column2' UNION
	SELECT 'Type', 'column3' UNION
	SELECT 'Successful Attempt', 'column4' UNION
	SELECT 'Point Awarded', 'column5' UNION
	SELECT 'Notes', 'column6'
	ORDER BY Property

	-- Data
	SELECT 
		FORMAT(c.Date, 'M/d/yy') Column1
		, s.Name Column2
		, CASE c.Type 
			WHEN 1 THEN 'Phone'
			WHEN 2 THEN 'Email'
			WHEN 3 THEN 'Text'
			WHEN 4 THEN 'Google Chat'
			WHEN 5 THEN 'Tutoring'
			WHEN 6 THEN 'SSW'
			WHEN 7 THEN 'IEP Service Time'
			WHEN 8 THEN 'Google Meet'
			WHEN 9 THEN 'In Person'
			ELSE 'Other'
		 END Column3 
		, IIF(c.WasSuccessful = 1, 'Yes', 'No') Column4
		, IIF(c.AwardPoint = 1, 'Yes', 'No') Column5
		, c.Notes Column6
	FROM Attendance.Communications c 
	INNER JOIN Common.Users s ON c.StaffId = s.Id
	WHERE c.UserId = @studentId
		AND c.Date >= @startDate
		AND c.Date < DATEADD(D, 1, @endDate)
	ORDER BY c.Date
END
ELSE IF @metric = 'onlineHoursSpent'
BEGIN
	-- Columns
	SELECT 'Date' Title, 'column1' Property UNION
	SELECT 'Class', 'column2' UNION
	SELECT 'Hours', 'column3' 
	ORDER BY Property

	-- Data
	SELECT	
		FORMAT(q.Date, 'M/d/yy') Column1
		, q.Class Column2
		, q.Hours Column3
	FROM (
		SELECT
			CAST(oh.Date AS DATE) Date
			, c.Name Class
			, SUM(oh.Value) Hours
		FROM Attendance.OnlineHours oh
		INNER JOIN Attendance.Classes c ON oh.ClassId = c.Id
		WHERE oh.UserId = @studentId
			AND oh.Date >= @startDate
			AND oh.Date < DATEADD(D, 1, @endDate)
		GROUP BY CAST(oh.Date AS DATE)
			, c.Name
	) q
	ORDER BY q.Date
		, q.Class
END
ELSE IF @metric = 'failingGrades'
BEGIN
	-- Columns
	SELECT 'Class' Title, 'column1' Property UNION
	SELECT 'Points Achieved', 'column2' UNION
	SELECT 'Points Possible', 'column3' UNION
	SELECT 'Score', 'column4' UNION
	SELECT 'Status', 'column5' 
	ORDER BY Property

	-- Data
	SELECT 
		c.Name Column1
		, cu.ScoreAchieved Column2
		, cu.ScorePossible Column3
		, CAST(CAST(ROUND(100 * cu.ScoreAchieved / NULLIF(cu.ScorePossible, 0), 0) AS INT) AS NVARCHAR(MAX)) + '%' Column4
		, IIF(cu.ScoreAchieved / NULLIF(cu.ScorePossible, 0) < 0.60, 'Failing', 'Passing') Column5
	FROM Attendance.vwClassUsers cu
	INNER JOIN Attendance.vwClasses c ON cu.ClassId = c.Id
	WHERE cu.UserId = @studentId
		AND CAST(c.StartDate AS DATE) <= @startDate
		AND CAST(c.EndDate AS DATE) >= @endDate
		AND CAST(ISNULL(cu.StartDate, @startDate) AS DATE) <= @startDate
		AND CAST(ISNULL(cu.EndDate, @endDate) AS DATE) >= @endDate
		AND cu.IsDeleted = 0
		AND c.IsDeleted = 0
	ORDER BY CAST(ROUND(100 * cu.ScoreAchieved / NULLIF(cu.ScorePossible, 0), 0) AS INT)
END
ELSE IF @metric = 'assignmentsAssignedDateRange'
BEGIN
	-- Columns
	SELECT 'Class' Title, 'column1' Property UNION
	SELECT 'Assignment', 'column2' UNION
	SELECT 'Type', 'column3' UNION
	SELECT 'Due', 'column4' UNION
	SELECT 'Grace Due', 'column5' UNION
	SELECT 'Submitted', 'column6'
	ORDER BY Property

	-- Data
	SELECT 
		c.Name Column1
		, cuw.Title Column2
		, Utility.fnSplitOnUppercase(cuw.Type) Column3
		, FORMAT(cuw.DueDate, 'M/d/yy') Column4
		, FORMAT(cuw.FinalDueDate, 'M/d/yy') Column5
		, FORMAT(cuw.SubmittedDate, 'M/d/yy') Column6
		, cuw.PointsAchieved Column7
		, cuw.PointsPossible Column8
		, CAST(CAST(ROUND(100 * cuw.PointsAchieved / NULLIF(cuw.PointsPossible, 0), 0) AS INT) AS NVARCHAR(MAX)) + '%' Column9
	FROM Attendance.fnClassUserWork(@startDate, @endDate, @studentId, DEFAULT) cuw
	INNER JOIN Attendance.Classes c ON cuw.ClassId = c.Id
	WHERE DueDate BETWEEN @startDate AND @endDate 
	ORDER BY cuw.FinalDueDate
		, cuw.DueDate
		, cuw.SubmittedDate
END
ELSE IF @metric = 'assignmentsCompletedDateRange'
BEGIN
	-- Columns
	SELECT 'Class' Title, 'column1' Property UNION
	SELECT 'Assignment', 'column2' UNION
	SELECT 'Type', 'column3' UNION
	SELECT 'Due', 'column4' UNION
	SELECT 'Grace Due', 'column5' UNION
	SELECT 'Submitted', 'column6'
	ORDER BY Property

	-- Data
	SELECT 
		c.Name Column1
		, cuw.Title Column2
		, Utility.fnSplitOnUppercase(cuw.Type) Column3
		, FORMAT(cuw.DueDate, 'M/d/yy') Column4
		, FORMAT(cuw.FinalDueDate, 'M/d/yy') Column5
		, FORMAT(cuw.SubmittedDate, 'M/d/yy') Column6
		, cuw.PointsAchieved Column7
		, cuw.PointsPossible Column8
		, CAST(CAST(ROUND(100 * cuw.PointsAchieved / NULLIF(cuw.PointsPossible, 0), 0) AS INT) AS NVARCHAR(MAX)) + '%' Column9
	FROM Attendance.fnClassUserWork(@startDate, @endDate, @studentId, DEFAULT) cuw
	INNER JOIN Attendance.Classes c ON cuw.ClassId = c.Id
	WHERE FinalDueDate BETWEEN @startDate AND @endDate AND SubmittedDate <= FinalDueDate
	ORDER BY cuw.FinalDueDate
		, cuw.DueDate
		, cuw.SubmittedDate
END
ELSE IF @metric = 'assignmentsCompletedOnTime'
BEGIN
	-- Columns
	SELECT 'Class' Title, 'column1' Property UNION
	SELECT 'Assignment', 'column2' UNION
	SELECT 'Type', 'column3' UNION
	SELECT 'Due', 'column4' UNION
	SELECT 'Grace Due', 'column5' UNION
	SELECT 'Submitted', 'column6'
	ORDER BY Property

	-- Data
	SELECT 
		c.Name Column1
		, cuw.Title Column2
		, Utility.fnSplitOnUppercase(cuw.Type) Column3
		, FORMAT(cuw.DueDate, 'M/d/yy') Column4
		, FORMAT(cuw.FinalDueDate, 'M/d/yy') Column5
		, FORMAT(cuw.SubmittedDate, 'M/d/yy') Column6
		, cuw.PointsAchieved Column7
		, cuw.PointsPossible Column8
		, CAST(CAST(ROUND(100 * cuw.PointsAchieved / NULLIF(cuw.PointsPossible, 0), 0) AS INT) AS NVARCHAR(MAX)) + '%' Column9
	FROM Attendance.fnClassUserWork(@startDate, @endDate, @studentId, DEFAULT) cuw
	INNER JOIN Attendance.Classes c ON cuw.ClassId = c.Id
	WHERE FinalDueDate BETWEEN @startDate AND @endDate AND SubmittedDate <= DueDate
	ORDER BY cuw.FinalDueDate
		, cuw.DueDate
		, cuw.SubmittedDate
END
ELSE IF @metric = 'assignmentsCompletedUpUntilEndDate'
BEGIN
	-- Columns
	SELECT 'Class' Title, 'column1' Property UNION
	SELECT 'Assignment', 'column2' UNION
	SELECT 'Type', 'column3' UNION
	SELECT 'Due', 'column4' UNION
	SELECT 'Grace Due', 'column5' UNION
	SELECT 'Submitted', 'column6' UNION
	SELECT 'Points Achieved', 'column7' UNION
	SELECT 'Points Possible', 'column8' UNION
	SELECT 'Score', 'column9'
	ORDER BY Property

	-- Data
	SELECT 
		c.Name Column1
		, cuw.Title Column2
		, Utility.fnSplitOnUppercase(cuw.Type) Column3
		, FORMAT(cuw.DueDate, 'M/d/yy') Column4
		, FORMAT(cuw.FinalDueDate, 'M/d/yy') Column5
		, FORMAT(cuw.SubmittedDate, 'M/d/yy') Column6
		, cuw.PointsAchieved Column7
		, cuw.PointsPossible Column8
		, CAST(CAST(ROUND(100 * cuw.PointsAchieved / NULLIF(cuw.PointsPossible, 0), 0) AS INT) AS NVARCHAR(MAX)) + '%' Column9
	FROM Attendance.fnClassUserWork(@startDate, @endDate, @studentId, DEFAULT) cuw
	INNER JOIN Attendance.Classes c ON cuw.ClassId = c.Id
	WHERE cuw.FinalDueDate <= @endDate
	ORDER BY cuw.FinalDueDate DESC
		, cuw.DueDate DESC
		, cuw.SubmittedDate DESC
END
ELSE IF @metric = 'assignmentsInGracePeriod'
BEGIN
	-- Columns
	SELECT 'Class' Title, 'column1' Property UNION
	SELECT 'Assignment', 'column2' UNION
	SELECT 'Type', 'column3' UNION
	SELECT 'Due', 'column4' UNION
	SELECT 'Grace Due', 'column5' UNION
	SELECT 'Submitted', 'column6' UNION
	SELECT 'Points Achieved', 'column7' UNION
	SELECT 'Points Possible', 'column8' UNION
	SELECT 'Score', 'column9'
	ORDER BY Property

	-- Data
	SELECT 
		c.Name Column1
		, cuw.Title Column2
		, Utility.fnSplitOnUppercase(cuw.Type) Column3
		, FORMAT(cuw.DueDate, 'M/d/yy') Column4
		, FORMAT(cuw.FinalDueDate, 'M/d/yy') Column5
		, FORMAT(cuw.SubmittedDate, 'M/d/yy') Column6
		, cuw.PointsAchieved Column7
		, cuw.PointsPossible Column8
		, CAST(CAST(ROUND(100 * cuw.PointsAchieved / NULLIF(cuw.PointsPossible, 0), 0) AS INT) AS NVARCHAR(MAX)) + '%' Column9
	FROM Attendance.fnClassUserWork(@startDate, @endDate, @studentId, DEFAULT) cuw
	INNER JOIN Attendance.Classes c ON cuw.ClassId = c.Id
	WHERE cuw.SubmittedDate IS NULL AND cuw.FinalDueDate > cuw.DueDate AND SYSUTCDATETIME() AT TIME ZONE 'UTC' AT TIME ZONE 'Eastern Standard Time' BETWEEN cuw.DueDate AND cuw.FinalDueDate
	ORDER BY cuw.FinalDueDate DESC
		, cuw.DueDate DESC
		, cuw.SubmittedDate DESC
END
ELSE
	RETURN 1 -- not implemented