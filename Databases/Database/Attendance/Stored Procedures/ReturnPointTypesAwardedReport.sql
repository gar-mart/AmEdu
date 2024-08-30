CREATE PROCEDURE Attendance.ReturnPointTypesAwardedReport (
	@startDate Date
	, @endDate Date
	, @chartGroupingFilter NVARCHAR(50)
	, @schoolFilter NVARCHAR(50)
	, @mentorFilter INT
)
AS
SET NOCOUNT ON

IF (@chartGroupingFilter = 'Grade Level')
BEGIN
	SELECT
		COALESCE(a.GradeLevel,'None') Label
		, COUNT(CASE Type WHEN 1 THEN 1 END) CommunicationCount
		, COUNT(CASE Type WHEN 2 THEN 1 END) IntegrityCount
		, COUNT(CASE Type WHEN 3 THEN 1 END) StewardshipCount
		, COUNT(CASE Type WHEN 4 THEN 1 END) SpendCount
		, COUNT(CASE Type WHEN 5 THEN 1 END) LessonCount
		, COUNT(CASE Type WHEN 6 THEN 1 END) RespectCount
		, COUNT(CASE Type WHEN 7 THEN 1 END) EngagementCount
	FROM Attendance.Points a
	INNER JOIN Common.Users u ON a.UserId = u.Id
	WHERE Date BETWEEN @startDate AND @endDate
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = a.MentorId)
	GROUP BY a.GradeLevel
	ORDER BY CAST(ISNULL(NULLIF(a.GradeLevel, 'K'), 0) AS INT)
END

IF (@chartGroupingFilter = 'Cell')
BEGIN
	SELECT
		(CASE WHEN a.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN a.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END) Label
		, COUNT(CASE Type WHEN 1 THEN 1 END) CommunicationCount
		, COUNT(CASE Type WHEN 2 THEN 1 END) IntegrityCount
		, COUNT(CASE Type WHEN 3 THEN 1 END) StewardshipCount
		, COUNT(CASE Type WHEN 4 THEN 1 END) SpendCount
		, COUNT(CASE Type WHEN 5 THEN 1 END) LessonCount
		, COUNT(CASE Type WHEN 6 THEN 1 END) RespectCount
		, COUNT(CASE Type WHEN 7 THEN 1 END) EngagementCount
	FROM Attendance.Points a
	INNER JOIN Common.Users u ON a.UserId = u.Id
	WHERE Date BETWEEN @startDate AND @endDate
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = a.MentorId)
	GROUP BY (CASE WHEN a.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN a.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END)
	ORDER BY 
		CASE 
			WHEN (CASE WHEN a.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN a.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END) = 'K-5' THEN 1
			WHEN (CASE WHEN a.GradeLevel IN ('K', '1', '2', '3', '4', '5') THEN 'K-5' ELSE (CASE WHEN a.GradeLevel IN ('6', '7', '8') THEN '6-8' ELSE '9-12' END) END) = '6-8' THEN 2
			ELSE 3 
		END
	END


IF (@chartGroupingFilter = 'Mentor')
BEGIN
	SELECT
		mu.Name Label
		, COUNT(CASE Type WHEN 1 THEN 1 END) CommunicationCount
		, COUNT(CASE Type WHEN 2 THEN 1 END) IntegrityCount
		, COUNT(CASE Type WHEN 3 THEN 1 END) StewardshipCount
		, COUNT(CASE Type WHEN 4 THEN 1 END) SpendCount
		, COUNT(CASE Type WHEN 5 THEN 1 END) LessonCount
		, COUNT(CASE Type WHEN 6 THEN 1 END) RespectCount
		, COUNT(CASE Type WHEN 7 THEN 1 END) EngagementCount
	FROM Attendance.Points a
	INNER JOIN Common.Users mu on a.MentorId = mu.Id
	INNER JOIN Common.Users u ON a.UserId = u.Id
	WHERE Date BETWEEN @startDate AND @endDate
		AND (@schoolFilter = 'All' OR u.Email LIKE '%' + @schoolFilter + '%'  )
		AND (@mentorFilter = -1 OR @mentorFilter = a.MentorId)
	GROUP BY mu.Name
	ORDER BY mu.Name
END