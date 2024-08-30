CREATE PROCEDURE Student.UpdateScoreHistory
AS
SET NOCOUNT ON

DECLARE @Date DATETIME2(0) = SYSUTCDATETIME()

;WITH SRC AS (
	SELECT a.*
	FROM Attendance.vwClassUsers a
	INNER JOIN Attendance.vwClasses b ON a.ClassId = b.Id
	WHERE a.IsDeleted = 0 -- student not removed from class
		AND @Date BETWEEN ISNULL(a.StartDate, b.StartDate) AND ISNULL(a.EndDate, b.EndDate) -- assignment/class still active 
		AND (a.ConnexusId > 0 OR a.LincolnLearningId > 0 OR a.FlexPointId > 0) -- include valid enrollments
		AND a.UserId IN (
			SELECT a.Id
			FROM Common.Users a
			WHERE a.IsActive = 1 -- student still active
				AND NOT a.UserId IN (SELECT UserId FROM Security.vwUserRoles ur WHERE RoleName IN ('Staff')) -- not a staff member
		)
		AND a.Status = 1 -- Active
) 
MERGE Student.ScoreHistory TRG USING SRC ON
	SRC.UserId = TRG.StudentId 
	AND SRC.ClassId = TRG.ClassId 
	AND SRC.ConnexusId = TRG.ConnexusEnrollmentId
	AND SRC.LincolnLearningId = TRG.LincolnLearningEnrollmentId
	AND SRC.FlexPointId = TRG.FlexPointEnrollmentId
	AND CAST(@Date AS DATE) = CAST(TRG.AsOfDate AS DATE)
WHEN NOT MATCHED THEN INSERT (
	StudentId
	, ClassId
	, ScoreAchieved
	, ScorePossible
	, AsOfDate
	, TotalSecondsSpentOnline
	, ConnexusEnrollmentId
	, LincolnLearningEnrollmentId
	, FlexPointEnrollmentId
) VALUES (
	SRC.UserId
	, SRC.ClassId
	, SRC.ScoreAchieved
	, SRC.ScorePossible
	, @Date
	, SRC.TotalSecondsSpentOnline
	, SRC.ConnexusId
	, SRC.LincolnLearningId
	, SRC.FlexPointId
)
WHEN MATCHED THEN UPDATE SET
	ScoreAchieved = SRC.ScoreAchieved
	, ScorePossible = SRC.ScorePossible
	, TotalSecondsSpentOnline = SRC.TotalSecondsSpentOnline
;