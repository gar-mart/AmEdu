CREATE PROCEDURE Attendance.CreateClassUser (
    @connexusId BIGINT -- FK to Classes
    , @lincolnLearningId BIGINT -- FK to Classes
    , @flexPointId BIGINT -- FK to Classes
    , @userEmailAddress NVARCHAR(320) -- this will be everything up to, but not including the @ sign
    , @enrollmentId BIGINT
    , @scoreAchieved DECIMAL(10, 2)
    , @scorePossible DECIMAL(10, 2)
    , @totalSecondsSpentOnline INT
    , @startDate DATETIME2(0)
    , @endDate DATETIME2(0)
    , @status TINYINT -- 1: Active, 4: Withdrawn, 5: WithdrawnFailed, 6: Transferred, 7: Completed, 8: CompletedNoCredit, 9: Suspended, 10: Inactive
)
AS
SET NOCOUNT ON

DECLARE @ClassId INT = (
    SELECT Id 
    FROM Attendance.Classes 
    WHERE ConnexusId = @connexusId 
        OR LincolnLearningId = @lincolnLearningId
        OR FlexPointId = @flexPointId
)
DECLARE @ConnexusEnrollmentId BIGINT
    , @LincolnLearningEnrollmentId BIGINT
    , @FlexPointEnrollmentId BIGINT
SET @ConnexusEnrollmentId = IIF(@connexusId IS NOT NULL, @enrollmentId, 0)
SET @LincolnLearningEnrollmentId = IIF(@lincolnLearningId IS NOT NULL, @enrollmentId, 0)
SET @FlexPointEnrollmentId = IIF(@flexPointId IS NOT NULL, @enrollmentId, 0)

IF @ClassId IS NOT NULL
    MERGE Attendance.ClassUsers TRG
    USING (SELECT Id UserId FROM Common.Users WHERE Email = @userEmailAddress) SRC ON 
        TRG.ClassId = @ClassId 
        AND TRG.UserId = SRC.UserId
        AND TRG.ConnexusId = @ConnexusEnrollmentId
        AND TRG.LincolnLearningId = @LincolnLearningEnrollmentId
        AND TRG.FlexPointId = @FlexPointEnrollmentId
    WHEN MATCHED THEN UPDATE SET 
        ConnexusId = @ConnexusEnrollmentId
        , LincolnLearningId = @LincolnLearningEnrollmentId
        , FlexPointId = @FlexPointEnrollmentId
        , ScoreAchieved = @scoreAchieved
        , ScorePossible = @scorePossible
        , TotalSecondsSpentOnline = @totalSecondsSpentOnline
        , IsDeleted = 0
        , MarkedForDelete = 0
        , StartDate = @startDate
        , EndDate = @endDate
        , Status = @status
        , AsOfDate = SYSUTCDATETIME()
    WHEN NOT MATCHED THEN INSERT (ClassId, UserId, ConnexusId, LincolnLearningId, FlexPointId, ScoreAchieved, ScorePossible, TotalSecondsSpentOnline, StartDate, EndDate, Status, AsOfDate) VALUES (
        @ClassId
        , SRC.UserId
        , @ConnexusEnrollmentId
        , @LincolnLearningEnrollmentId
        , @FlexPointEnrollmentId
        , @scoreAchieved
        , @scorePossible
        , @totalSecondsSpentOnline
        , @startDate
        , @endDate
        , @status
        , SYSUTCDATETIME()
    );
