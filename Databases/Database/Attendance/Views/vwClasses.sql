-- Summary:
--   Filters out "invalid" classes
CREATE VIEW Attendance.vwClasses
AS 
SELECT 
	Id 
	, Name 
	, StartDate 
	, EndDate 
	, ConnexusId 
	, LincolnLearningId 
	, FlexPointId 
	, MarkedForDelete 
	, IsDeleted 
FROM Attendance.Classes
WHERE Name NOT LIKE '%DEMO%'
	AND Name NOT LIKE '%TEST%'
	AND (
		Name NOT LIKE '%MASTER%'
		OR Name = 'Elementary Spanish I (CL), 7.20 - 2nd Sem Master' -- special one time exception
	)
