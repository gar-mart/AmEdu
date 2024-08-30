-- Returns the enrollment report (aka attendance report) for all students enrolled for a date range.
-- Optionally supply Grade Level and/or Email Domain to filter the students.
-- Students are awarded a number of points for each week in the following order:
--   1. 2 Points if the student received 2 or more communication + live lesson points and the student was enrolled the whole week
--   2. 1 Point if the student receieved 1 or more communication + live lesson points
--   3. NULL if the student was not enrolled during the week at all or there was a school break
--   4. 0 Points otherwise.
--   Exception: each assignment submitted counts as a point for a maximum total of 2 points

CREATE PROCEDURE Staff.ReturnEnrollmentReport (
	@gradeLevel NVARCHAR(2) = NULL
	, @emailDomain NVARCHAR(25) = NULL
	, @startDate DATE
	, @endDate DATE
	, @studentIds Tvp.IdList READONLY
)
AS
SET NOCOUNT ON

-- move the requested @startDate back to the beginning of the week since we report weekly
SELECT @startDate = IIF(CAST(DATEADD(WW, 1, BeginningOfWeek) AS DATE) = @startDate, @startDate, BeginningOfWeek)
FROM Common.GetBeginningOfWeek(@startDate)

CREATE TABLE #Weeks(StartDate DATE, EndDate DATE)

CREATE TABLE #StudentsTable(
	Id INT 
	, Name NVARCHAR(200)
	, FirstName NVARCHAR(100)
	, LastName NVARCHAR(100)
	, EnrollmentDate DATE
	, UnenrollmentDate DATE
	, GradeLevel NVARCHAR(10)
	, UICNumber BIGINT
)

;WITH Weeks AS (
  SELECT @startDate StartDate, DATEADD(WW, 1, @startDate) EndDate
  UNION ALL
  SELECT NextStart, DATEADD(WW, 1, NextStart)
  FROM Weeks
  CROSS APPLY (
	SELECT NextStart = DATEADD(WW, 1, StartDate)
  ) a
  WHERE NextStart <=  @endDate
)
INSERT INTO #Weeks(StartDate, EndDate)
SELECT StartDate, EndDate FROM Weeks

-- Get and return all students that were enrolled between @startDate and @endDate
INSERT INTO #StudentsTable
SELECT
	u.Id
	, u.Name
	, u.FirstName
	, u.LastName
	, u.EnrollmentDate
	, u.UnenrollmentDate
	, u.GradeLevel
	, u.UICNumber
FROM Common.vwUsers u
LEFT JOIN @studentIds ids ON u.Id = ids.Id
WHERE u.IsStaff = 0
	AND IIF(u.EnrollmentDate <= @endDate AND @startDate <= ISNULL(u.UnenrollmentDate, @startDate), 1, 0) = 1
	AND u.Email LIKE '%' + ISNULL(@emailDomain, '%')
	AND (u.GradeLevel = @gradeLevel OR @gradeLevel IS NULL)
	AND (
		-- if no student IDs were provided, then all students are returned
		NOT EXISTS (SELECT * FROM @studentIds)
		OR ids.Id IS NOT NULL
	)

-- return the @Students result to the front-end
SELECT * 
FROM #StudentsTable
ORDER BY LastName

-- return the enrollment calculations for every week between @startDate and @endDate
SELECT 
	Student.Id
	, Weeks.StartDate
	, Weeks.EndDate
	, AttendanceCriteriaPoints.PointsAwarded
	, AttendanceCriteriaPoints.PointsPossible
FROM #StudentsTable Student
CROSS JOIN #Weeks Weeks
CROSS APPLY (
	SELECT CAST(Weeks.StartDate AS DATE) [Date]
) Monday
CROSS APPLY (
	-- students can only earn one point if they were enrolled part of a week
	-- don't report points at all if the student wasn't enrolled during the week 
	SELECT CASE
		-- do not count weeks that were on a school break
		WHEN EXISTS (
			SELECT * 
			FROM Common.Breaks b 
			WHERE b.StartDate <= Monday.[Date]
				AND b.EndDate >= DATEADD(DAY, 4, Monday.[Date]) -- Friday
		) THEN NULL

		-- for partial school breaks, only allow up to one point awarded
		WHEN EXISTS (
			SELECT * 
			FROM Common.Breaks b
			WHERE b.StartDate BETWEEN Monday.[Date] AND DATEADD(DAY, 4, Monday.[Date]) -- Friday
				OR b.EndDate BETWEEN Monday.[Date] AND DATEADD(DAY, 4, Monday.[Date]) -- Friday
		) THEN 1

		WHEN Student.EnrollmentDate BETWEEN DATEADD(DAY, 1, Monday.[Date]) AND DATEADD(DAY, 4, Monday.[Date]) THEN 1 -- student enrolled on Tuesday - Friday
		WHEN Student.UnenrollmentDate BETWEEN Monday.[Date] AND DATEADD(DAY, 3, Monday.[Date]) THEN 1 -- student unenrolled on Monday - Thursday
		WHEN DATEADD(DAY, 4, Monday.[Date]) < Student.EnrollmentDate THEN NULL -- student enrolled after Friday
		WHEN Student.UnenrollmentDate < Monday.[Date] THEN NULL -- student unenrolled before Monday
		ELSE 2
	END Total		
) MaxPoints
CROSS APPLY (
	SELECT COUNT(*) Count
	FROM Attendance.LiveLessonPoints llp
	WHERE 
		llp.UserId = Student.Id
		AND llp.Date >= Weeks.StartDate
		AND llp.Date < Weeks.EndDate
) LiveLessonPoints
CROSS APPLY (
	SELECT ISNULL(SUM(p.Value), 0) Count
	FROM Attendance.Points p
	WHERE
		p.UserId = Student.Id
		AND p.Date >= Weeks.StartDate
		AND p.Date < Weeks.EndDate
		AND p.Type = 1 -- Communication
) CommunicationPoints
CROSS APPLY (
	SELECT SUM(a.[Count]) Count
	FROM (
		SELECT COUNT(*) Count
		FROM Attendance.ClassUserWork cuw
		WHERE 
			cuw.UserId = Student.Id
			AND cuw.SubmittedDate >= Weeks.StartDate
			AND cuw.SubmittedDate < Weeks.EndDate	
		GROUP BY cuw.ItemId -- don't count the same assignment submitted more than once as more than one for a given week
	) a
) AssignmentsCompletedPoints
CROSS APPLY (
	SELECT CASE 		
		WHEN MaxPoints.Total IS NULL THEN NULL -- don't report points for weeks n/a
		WHEN CommunicationPoints.Count + LiveLessonPoints.Count + AssignmentsCompletedPoints.Count >= 2 AND MaxPoints.Total >= 2 THEN 2
		WHEN CommunicationPoints.Count + LiveLessonPoints.Count + AssignmentsCompletedPoints.Count >= 1 AND MaxPoints.Total >= 1 THEN 1
		ELSE 0
	END PointsAwarded
	, MaxPoints.Total PointsPossible
) AttendanceCriteriaPoints
ORDER BY Weeks.StartDate
