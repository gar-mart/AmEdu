CREATE PROCEDURE Attendance.ReturnEnrollmentsToSyncClassWork
	@apiType TINYINT -- 1: Connexus, 2: Lincoln Learning, 3: Flex Point
AS
SET NOCOUNT ON

-- classes
DECLARE @Classes TABLE (Id INT, ConnexusId BIGINT, LincolnLearningId BIGINT, FlexPointId BIGINT)
INSERT INTO @Classes 
OUTPUT INSERTED.*
SELECT 
	c.Id
	, c.ConnexusId
	, c.LincolnLearningId
	, c.FlexPointId
FROM Attendance.Classes c
WHERE c.IsDeleted = 0
	AND DATEADD(MONTH, -1, SYSUTCDATETIME()) BETWEEN DATEADD(MONTH, -1, c.StartDate) AND c.EndDate -- include classes in this sync for up to one month after the end date to make sure we completely sync them
	AND (
		@apiType = 1
		AND c.ConnexusId IS NOT NULL 
		AND c.ConnexusId <> ''
		OR @apiType = 2
		AND c.LincolnLearningId IS NOT NULL 
		AND c.LincolnLearningId <> ''
		OR @apiType = 3
		AND c.FlexPointId IS NOT NULL 
		AND c.FlexPointId <> ''
	)

-- class users
SELECT 
	c.ClassId
	, c.ConnexusId
	, c.LincolnLearningId
	, c.FlexPointId
FROM Attendance.ClassUsers c
INNER JOIN Common.vwUsers u ON c.UserId = u.Id
WHERE 
	c.ClassId IN (SELECT Id FROM @Classes)
	AND c.IsDeleted = 0
	AND u.IsStaff = 0

