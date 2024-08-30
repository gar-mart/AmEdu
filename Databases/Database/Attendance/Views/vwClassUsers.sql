-- Summary:
--   Filters out "invalid" enrollments
CREATE VIEW Attendance.vwClassUsers
AS 
SELECT	
	cu.AsOfDate
	, cu.ClassId
	, cu.ConnexusId
	, cu.EndDate
	, cu.FlexPointId
	, cu.IsDeleted
	, cu.LincolnLearningId
	, cu.MarkedForDelete
	, cu.Score
	, cu.ScoreAchieved
	, cu.ScorePossible
	, cu.ScoreRatio
	, cu.StartDate
	, cu.Status
	, cu.TotalSecondsSpentOnline
	, cu.UserId
FROM Attendance.ClassUsers cu
WHERE cu.ConnexusId > 0 
	OR cu.LincolnLearningId > 0
	OR cu.FlexPointId > 0
