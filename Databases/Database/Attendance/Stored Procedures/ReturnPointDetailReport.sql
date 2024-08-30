CREATE PROCEDURE Attendance.ReturnPointDetailReport (
	@startDate DATE
	, @endDate DATE
	, @schoolFilter NVARCHAR(50)
)
AS
SET NOCOUNT ON

SELECT 
	u.FirstName + ' ' + u.LastName StudentName
	, ISNULL(u.GradeLevel, '') GradeLevel
	, ISNULL(SUM(IIF(p.Type = 1, p.Value, NULL)), 0) LiveLessonPoints
	, ISNULL(SUM(IIF(p.Type = 5, p.Value, NULL)), 0) CommunicationPoints

	, ISNULL(SUM(IIF(p.Type = 6, p.Value, NULL)), 0) RespectPoints
	, ISNULL(SUM(IIF(p.Type = 2, p.Value, NULL)), 0) IntegrityPoints
	, ISNULL(SUM(IIF(p.Type = 3, p.Value, NULL)), 0) StewardshipPoints
	, ISNULL(SUM(IIF(p.Type = 7, p.Value, NULL)), 0) EngagementPoints
	, ISNULL(SUM(IIF(p.Type IN (6, 2, 3, 7), p.Value, NULL)), 0) TotalPoints -- R.I.S.E Points

	, u.Email StudentEmail
	, @startDate dateRangeStart
	, @endDate dateRangeEnd
FROM Common.vwUsers u 
LEFT JOIN Attendance.Points p ON p.UserId = u.Id AND p.Date BETWEEN @startDate AND @endDate
WHERE
	u.IsStaff = 0
	AND u.IsActive = 1
GROUP BY u.FirstName, u.LastName, u.Email, u.GradeLevel, u.IsActive, u.EnrollmentDate, u.UnenrollmentDate
ORDER BY 
	u.FirstName
	, u.LastName
	, CASE 
		WHEN u.GradeLevel = 'K' THEN 0
		WHEN u.GradeLevel IS NULL THEN 13
		ELSE CAST(u.GradeLevel AS INT)
	 END


        --Communication = 1,
        --Integrity = 2,
        --Stewardship = 3,
        --Spend = 4,
        --Lesson = 5,
        --Respect = 6,
        --Engagement = 7