CREATE PROCEDURE [Notification].[ReturnExpiredOrientation]
AS
SET NOCOUNT ON

DECLARE @t TABLE (StudentId INT, MentorId INT, TotalSteps TINYINT, CompletedSteps TINYINT);
 
INSERT INTO @t
SELECT
	a.Id
	, a.MentorId
	, d.TotalSteps
	, f.CompletedSteps
FROM Common.vwUsers a
CROSS APPLY(
	SELECT COUNT(*) TotalSteps 
	FROM Orientation.vwStudentSteps c
	WHERE c.UserId = a.Id
		AND c.IsActive = 1
) d
CROSS APPLY(
	SELECT COUNT(*) CompletedSteps 
	FROM Orientation.CompletedSteps e 
	INNER JOIN Orientation.StepGradeLevel g ON g.GradeLevel = a.GradeLevel AND e.StepId = g.StepId
	INNER JOIN Orientation.Steps i ON e.StepId = i.Id AND i.IsActive = 1
	WHERE e.UserId = a.Id
) f
WHERE 
	DATEDIFF(HOUR, a.OrientationStartTime, SYSDATETIME()) > 48
	AND a.OrientationFinishTime IS NULL
	AND ISNULL(a.OrientationExpiredNotificationSent, 0) = 0
	AND a.IsActive = 1
	AND a.IsStaff = 0

--R1 Students
SELECT 
	b.Id
	, b.Name
	, b.Email
	, a.MentorId
	, a.CompletedSteps
	, a.TotalSteps
	, IIF(a.TotalSteps = 0, 0, a.CompletedSteps * 1.0 / a.TotalSteps) ProgressPercent
FROM @t a
INNER JOIN Common.Users b ON a.StudentId = b.Id
ORDER BY b.Name

-- R2 Mentors
SELECT 
	b.Id
	, b.Name
	, b.Email
FROM @t a
INNER JOIN Common.Users b ON a.MentorId = b.Id
ORDER BY b.Name