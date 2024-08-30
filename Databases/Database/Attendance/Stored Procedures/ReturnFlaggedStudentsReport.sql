CREATE PROCEDURE Attendance.ReturnFlaggedStudentsReport (
	@startDate Date
	, @endDate Date
)
AS
SET NOCOUNT ON

SELECT s.Name StudentName
    , s.Email StudentEmail
    , ef.GradeLevel
    , ef.WeekOfDate
    , m.Name MentorName
    , b.Level
    , b.Status
FROM Attendance.Interventions i
INNER JOIN Attendance.EngagementFlags ef ON i.EngagementFlagId = ef.Id
INNER JOIN Common.Users s ON ef.UserId = s.Id
LEFT JOIN Common.Users m ON ef.MentorId = m.Id
INNER JOIN (
    SELECT eff.Id
        , ii.Status
        , MAX(ii.Level) Level
    FROM Attendance.Interventions ii
    INNER JOIN Attendance.EngagementFlags eff ON ii.EngagementFlagId = eff.Id
    WHERE 
        IIF(@startDate <= eff.WeekOfDate AND DATEADD(DAY,-7, eff.WeekOfDate) <= ISNULL(@endDate, DATEADD(DAY,-7, eff.WeekOfDate)), 1, 0) = 1
        AND ii.LogOnly = 0 
        AND Level > 0
    GROUP BY ii.EngagementFlagId, eff.Id, ii.Status
) b ON ef.Id = b.Id
ORDER BY s.Name
