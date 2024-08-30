DECLARE @userId INT = 970 -- Noah Henry
DECLARE @classId INT = NULL
-- 2022 first semester
DECLARE @startDate DATE = '2022-07-01'
DECLARE @endDate DATE = '2022-1-25'

SELECT
	IIF(IsIncluded.IsIncluded = 1, 'YES', 'no') 'Counted in engagement report'
	, IIF(cuw.SubmittedDate IS NOT NULL, 'YES', 'no') 'Turned in'
	, CASE WHEN cuw.SubmittedDate IS NULL AND FinalDueDateActual.FinalDueDate > cw.DueDate AND SYSUTCDATETIME() AT TIME ZONE 'UTC' AT TIME ZONE 'Eastern Standard Time' BETWEEN cw.DueDate AND FinalDueDateActual.FinalDueDate THEN 'YES' ELSE 'no' END 'In grace period'
	, CASE WHEN FinalDueDateActual.FinalDueDate BETWEEN @startDate AND @endDate AND SubmittedDate <= DueDate THEN 'YES' ELSE 'no' END 'Completed on time'
	, cu.*
	, c.*
	, cw.*
	, cuw.*
FROM Attendance.ClassUsers cu
INNER JOIN Attendance.Classes c ON c.Id = cu.ClassId
INNER JOIN Attendance.ClassWork cw ON cw.ClassId = c.Id
LEFT JOIN Attendance.ClassUserWork cuw ON cw.ItemId = cuw.ItemId AND cu.LincolnLearningId = cuw.LincolnLearningEnrollmentId AND cu.ConnexusId = cuw.ConnexusEnrollmentId
CROSS APPLY (
	SELECT IIF(
		cw.IsDeleted = 0
		-- don't include deleted users
		AND cu.IsDeleted = 0 
		-- don't include assignments that are not gradable
		AND cw.Gradable = 1
		-- optional filter by user
		AND (@userId IS NULL OR cu.UserId = @userId)
		-- optional filter by class
		AND (@classId IS NULL OR cu.ClassId = @classId)
		-- user was remvoed from the class
		AND (cuw.IsDeleted IS NULL OR cuw.IsDeleted = 0)
		-- include the first submission attempt only
		AND (cuw.WorkId IS NULL OR cuw.WorkId = 1)
		-- count class work that overlaps the enrollment only
		AND cw.DueDate BETWEEN cu.StartDate AND cu.EndDate
		-- include all data for the selected school year(s) (uses the DueDate as the determining school year)
		AND YEAR(cw.DueDate) - IIF(MONTH(cw.DueDate) >= 7, 0, 1) BETWEEN YEAR(@startDate) - IIF(MONTH(@startDate) >= 7, 0, 1) AND YEAR(@endDate) - IIF(MONTH(@endDate) >= 7, 0, 1)		
		, 1
		, 0
	) IsIncluded
) IsIncluded
CROSS APPLY (
	SELECT CASE
		WHEN cw.DueDateGrace = -1 THEN cu.EndDate
		ELSE DATEADD(MINUTE, cw.DueDateGrace, cw.DueDate) 
	END FinalDueDate
) FinalDueDateCalculation
CROSS APPLY (
	SELECT IIF(
		FinalDueDateCalculation.FinalDueDate > cu.EndDate
		, cu.EndDate
		, FinalDueDateCalculation.FinalDueDate
	) FinalDueDate
) FinalDueDateActual
WHERE cu.UserId = @userId
ORDER BY IsIncluded.IsIncluded DESC
	, c.Name