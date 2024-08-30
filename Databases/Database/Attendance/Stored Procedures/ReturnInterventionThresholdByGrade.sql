CREATE PROCEDURE Attendance.ReturnInterventionThresholdByGrade (
	@grade NVARCHAR(10)
)
AS
SET NOCOUNT ON

DECLARE
	@Now DATETIME2 = DATEADD(HOUR, 60, SYSDATETIME())
	, @CurrentMondayDate DATE
	, @Scale DECIMAL(7,2)

SET @CurrentMondayDate = DATEADD(DAY, -((DATEPART(WEEKDAY,@Now) + 5) % 7), @Now)

SET @Scale = CAST((
	SELECT COUNT(*)
	FROM (
		SELECT @CurrentMondayDate StartDate
		UNION ALL
		SELECT DATEADD(DAY, 1, @CurrentMondayDate)
		UNION ALL
		SELECT DATEADD(DAY, 2, @CurrentMondayDate)
		UNION ALL
		SELECT DATEADD(DAY, 3, @CurrentMondayDate)
		UNION ALL
		SELECT DATEADD(DAY, 4, @CurrentMondayDate)
	) a
	WHERE NOT EXISTS (SELECT * FROM Common.Breaks b WHERE a.StartDate BETWEEN b.StartDate AND b.EndDate)
) AS DECIMAL(7,2)) / 5

SELECT 
	a.Grade
	, a.Id
	, CEILING(a.MinimumCommunicationLogs * @Scale) MinimumCommunicationLogs
	, a.MinimumCourseHoursSpent * @Scale MinimumCourseHoursSpent
	, CEILING(a.MinimumLiveLessons * @Scale) MinimumLiveLessons
	, CEILING(a.ExpectedCommunicationLogs * @Scale) ExpectedCommunicationLogs
	, CEILING(a.ExpectedLiveLessons * @Scale) ExpectedLiveLessons
	, a.NumberOfRequirements
FROM Attendance.InterventionThresholds a
WHERE a.Grade = @grade
