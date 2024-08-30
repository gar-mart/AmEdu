CREATE PROCEDURE Staff.ReturnEngagementReport (
	@currentUserId INT
	, @startDate DATE
	, @endDate DATE
	, @studentId INT 
	, @perPage INT 
	, @page INT
	, @studentName NVARCHAR(100)
	, @gradeLevel NVARCHAR(5)
	, @enrollmentStatus BIT
	, @myStudents BIT
	, @school NVARCHAR(30)
	, @total INT OUTPUT
	, @sortBy NVARCHAR(100)
	, @sortDirection NVARCHAR(4) -- asc, desc
)
AS
SET NOCOUNT ON

DECLARE @Offset INT = (@page - 1) * @perPage
DECLARE @FilteredStudents AS TABLE (Id INT)

SET @sortDirection = ISNULL(@sortDirection, 'asc') -- this is the default sortDirection
SET @sortBy = ISNULL(@sortBy, 'name')              -- this is the default sortBy

-- only filter by "My Students" if the user is a mentor
SET @myStudents = CASE WHEN @myStudents = 1 AND EXISTS (
	SELECT * 
	FROM Common.Users u
	WHERE u.IsActive = 1
		AND (
			u.MentorId = @currentUserId
			OR u.SecondaryMentorId = @currentUserId
		)
) 
THEN 1 
ELSE 0 END

INSERT INTO @FilteredStudents (Id)
SELECT u.Id
FROM Common.vwUsers u
WHERE u.IsStaff = 0
	AND (
		@studentId IS NULL
		OR u.Id = @studentId
	)
	AND (
		NULLIF(@myStudents, 0) IS NULL
		OR u.MentorId = @currentUserId
		OR u.SecondaryMentorId = @currentUserId
	)
	AND (
		NULLIF(@gradeLevel, 'All') IS NULL
		OR u.GradeLevel = @gradeLevel
	)
	AND (
		NULLIF(@school, 'All') IS NULL
		OR u.Email LIKE '%' + @school
	)
	AND (
		@enrollmentStatus IS NULL
		OR u.IsActive = @enrollmentStatus
	)
	AND (
		NULLIF(@studentName, '') IS NULL
		OR u.Name LIKE '%' + @studentName + '%'
	)
	
SET @total = (SELECT COUNT(*) FROM @FilteredStudents)

SELECT
	a.Id
	, a.LastName + ', ' + a.FirstName Name
	, a.GradeLevel
	, a.Email StudentEmail
	, a.IsActive
	, CASE 
		WHEN cs.WayToReachAsStudent = 1 THEN 'Email'
		WHEN cs.WayToReachAsStudent = 2 THEN 'Phone'
		WHEN cs.WayToReachAsStudent = 3 THEN 'Text'
		END PreferredContactMethod
	, cs.ContactAsStudentInfo as PreferredContactInfo
	, IIF(h.HasStudents = 0 OR @currentUserId IN (a.MentorId, a.SecondaryMentorId), 1, 0) IsMyStudent
	, n.CommunicationPoints
	, o.LiveLessonPoints
	, p.OnlineHoursSpent
	, q.FailingGrades
	, r.AnyTardies
	, a.HasAccomodations
	, COALESCE(ClassUserWork.AssignmentsCompleted, 0) AssignmentsCompleted
	, COALESCE(ClassUserWork.AssignmentsCompletedDateRange, 0) AssignmentsCompletedDateRange
	, COALESCE(ClassUserWork.AssignmentsInGracePeriod, 0) AssignmentsInGracePeriod
	, COALESCE(ClassUserWork.TotalAssignments, 0) TotalAssignments
	, COALESCE(ClassUserWork.TotalAssignmentsDateRange, 0) TotalAssignmentsDateRange
	, COALESCE(ClassUserWork.AssignmentsCompletedOnTime, 0) AssignmentsCompletedOnTime
	, COALESCE(ClassUserWork.TotalAssignmentsUpUntilEndDate, 0) TotalAssignmentsUpUntilEndDate
	, COALESCE(ClassUserWork.AssignmentsCompletedUpUntilEndDate, 0) AssignmentsCompletedUpUntilEndDate
	, COALESCE(ClassUserWork.AssignmentsAssignedDateRange, 0) AssignmentsAssignedDateRange
	, s.NumAbsences
	, LiveLessonsOffered.Total LiveLessonsOffered
FROM Common.Users a
INNER JOIN @FilteredStudents fs ON a.Id = fs.Id
LEFT JOIN Common.Users b ON a.MentorId = b.Id
LEFT JOIN Common.Users j ON a.SecondaryMentorId = j.Id
LEFT JOIN Orientation.Step_ConnectionSurvey cs on a.Id = cs.UserId
CROSS APPLY (
	SELECT IIF(EXISTS(
		SELECT * 
		FROM Common.Users h1 
		WHERE h1.MentorId = @currentUserId
	), 1, 0) HasStudents
) h
CROSS APPLY (
	SELECT ISNULL(SUM(l1.Value), 0) CommunicationPoints
	FROM Attendance.Points l1
	WHERE l1.UserId = a.Id
		AND l1.Type = 1
		AND l1.Date >= @startDate
		AND l1.Date < DATEADD(D, 1, @endDate)
) n
CROSS APPLY (
	SELECT COUNT(*) LiveLessonPoints
	FROM Attendance.LiveLessonPoints o1
	WHERE o1.UserId = a.Id
		AND o1.Date >= @startDate
		AND o1.Date < DATEADD(D, 1, @endDate)
) o
CROSS APPLY (
	SELECT ISNULL(SUM(p.Value), 0) OnlineHoursSpent
	FROM Attendance.OnlineHours p
	WHERE p.UserId = a.Id
		AND p.Date >= @startDate
		AND p.Date < DATEADD(D, 1, @endDate)
) p
CROSS APPLY (
	SELECT COUNT(*) FailingGrades
	FROM Attendance.vwClassUsers q
	INNER JOIN Attendance.vwClasses q1 ON q.ClassId = q1.Id
	WHERE q.UserId = a.Id
		AND (q.ScoreAchieved / NULLIF(q.ScorePossible, 0)) < 0.60--%
		AND CAST(q1.StartDate AS DATE) <= @startDate
		AND CAST(q1.EndDate AS DATE) >= @endDate
		AND CAST(ISNULL(q.StartDate, @startDate) AS DATE) <= @startDate
		AND CAST(ISNULL(q.EndDate, @endDate) AS DATE) >= @endDate
		AND q.IsDeleted = 0
		AND q1.IsDeleted = 0
) q
CROSS APPLY (
	SELECT AnyTardies = IIF(EXISTS (
		SELECT * 
		FROM Attendance.Tardies r
		WHERE r.UserId = a.Id
			AND r.Date >= @startDate
			AND r.Date < DATEADD(D, 1, @endDate)
	), 1, 0)
) r
CROSS APPLY (
	SELECT SUM(DATEDIFF(
		day,
		(CASE WHEN s.StartDate > @startDate THEN s.StartDate
			ELSE @startDate END), 
		(CASE WHEN s.EndDate < @endDate THEN s.EndDate
			ELSE @endDate END)) + 1) NumAbsences
	FROM Attendance.Absences s
	WHERE s.UserId = a.Id
		AND ( s.StartDate >= @startDate
		AND s.StartDate < DATEADD(D, 1, @endDate) OR
			s.EndDate >= @startDate
		AND s.EndDate < DATEADD(D, 1, @endDate)
		)
	) s
LEFT JOIN Attendance.fxSummarizeClassUserWork(@startDate, @endDate) ClassUserWork ON a.Id = ClassUserWork.UserId
CROSS APPLY (
	SELECT COUNT(*) Total
	FROM Staff.fnLiveLessonsOffered(a.Id, @startDate, @endDate) llo
) LiveLessonsOffered
ORDER BY 	
	-- Text Sorting (there is only name right now)
	CASE WHEN @sortBy = 'name' AND @sortDirection = 'asc' THEN a.Name END ASC,
	CASE WHEN @sortBy = 'name' AND @sortDirection = 'desc' THEN a.Name END DESC,

	-- Numeric Sort ASC
	CASE WHEN @sortDirection <> 'asc' THEN 1
	ELSE
		CASE 
			WHEN @sortBy = 'liveLessonPoints' THEN LiveLessonPoints
			WHEN @sortBy = 'communicationPoints' THEN CommunicationPoints
			WHEN @sortBy = 'onlineHoursSpent' THEN OnlineHoursSpent
			WHEN @sortBy = 'failingGrades' THEN FailingGrades
			WHEN @sortBy = 'assignmentsCompletedDateRange' THEN AssignmentsCompletedDateRange
			WHEN @sortBy = 'assignmentsCompletedUpUntilEndDate' THEN AssignmentsCompletedUpUntilEndDate
			WHEN @sortBy = 'assignmentsCompletedOnTime' THEN AssignmentsCompletedOnTime
			WHEN @sortBy = 'assignmentsInGracePeriod' THEN AssignmentsInGracePeriod
			WHEN @sortBy = 'isActive' THEN a.IsActive
			WHEN @sortBy = 'numAbsences' THEN NumAbsences
			WHEN @sortBy = 'assignmentsAssignedDateRange' THEN AssignmentsAssignedDateRange
		END
	END ASC,
	
	-- Numeric Sort DESC
	CASE WHEN @sortDirection <> 'desc' AND @sortBy IS NOT NULL THEN 1
	ELSE
		CASE 
			WHEN @sortBy = 'liveLessonPoints' THEN LiveLessonPoints
			WHEN @sortBy = 'communicationPoints' THEN CommunicationPoints
			WHEN @sortBy = 'onlineHoursSpent' THEN OnlineHoursSpent
			WHEN @sortBy = 'failingGrades' THEN FailingGrades
			WHEN @sortBy = 'assignmentsCompletedDateRange' THEN AssignmentsCompletedDateRange
			WHEN @sortBy = 'assignmentsCompletedUpUntilEndDate' THEN AssignmentsCompletedUpUntilEndDate
			WHEN @sortBy = 'assignmentsCompletedOnTime' THEN AssignmentsCompletedOnTime
			WHEN @sortBy = 'assignmentsInGracePeriod' THEN AssignmentsInGracePeriod
			WHEN @sortBy = 'isActive' THEN a.IsActive
			WHEN @sortBy = 'numAbsences' THEN NumAbsences
			WHEN @sortBy = 'assignmentsAssignedDateRange' THEN AssignmentsAssignedDateRange
		END
	END DESC
OFFSET @Offset ROWS FETCH NEXT @perPage ROWS ONLY