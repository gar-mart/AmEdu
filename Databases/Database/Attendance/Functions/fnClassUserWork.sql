CREATE FUNCTION Attendance.fnClassUserWork (
	@startDate DATE
	, @endDate DATE
	, @userId INT = NULL
	, @classId INT = NULL
)
RETURNS TABLE AS RETURN
(
	SELECT 
		cw.DueDate
		, cu.UserId
		, cuw.SubmittedDate
		-- don't allow the FinalDueDate to be greater than the enrollment end date
		, IIF(FinalDueDateCalculation.FinalDueDate > cu.EndDate, cu.EndDate, FinalDueDateCalculation.FinalDueDate) FinalDueDate
		, cu.EndDate
		, cw.ClassId
		, cw.Title
		, cuw.PointsPossible
		, cuw.PointsAchieved
		, cw.Type
	FROM Attendance.ClassWork cw
	INNER JOIN Attendance.ClassUsers cu ON cw.ClassId = cu.ClassId
	LEFT JOIN Attendance.ClassUserWork cuw ON 
		cuw.ConnexusEnrollmentId = cu.ConnexusId
		AND cuw.LincolnLearningEnrollmentId = cu.LincolnLearningId
		AND cuw.FlexPointEnrollmentId = cu.FlexPointId
		AND cw.ItemId = cuw.ItemId
	CROSS APPLY (
		SELECT CASE
			WHEN cw.DueDateGrace = -1 THEN cu.EndDate
			ELSE DATEADD(MINUTE, cw.DueDateGrace, cw.DueDate) 
		END FinalDueDate
	) FinalDueDateCalculation
	WHERE
		-- don't include deleted class work
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
)