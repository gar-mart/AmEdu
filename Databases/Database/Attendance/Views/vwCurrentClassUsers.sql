-- Summary:
--   Returns active enrollments (students and teachers)
CREATE VIEW Attendance.vwCurrentClassUsers
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
FROM Attendance.vwClassUsers cu
INNER JOIN Attendance.vwClasses c ON cu.ClassId = c.Id
INNER JOIN Common.Users u ON cu.UserId = u.Id
WHERE 
	-- Check enrollment
	cu.IsDeleted = 0
	AND SYSUTCDATETIME() BETWEEN cu.StartDate AND cu.EndDate
	AND cu.Status = 1 -- Active
	-- Check course
	AND c.IsDeleted = 0
	AND SYSUTCDATETIME() BETWEEN c.StartDate AND c.EndDate
	-- Check user
	AND u.IsActive = 1
