CREATE PROCEDURE Attendance.UpdateOnlineHours (
    @connexusId BIGINT
    , @lincolnLearningId BIGINT
    , @flexPointId BIGINT
    , @date DATETIME2(0)
    , @seconds INT
)
AS
SET NOCOUNT ON

DECLARE @hours DECIMAL(7, 5) = CAST((@seconds / 3600.0) AS DECIMAL(7, 5))

SELECT
    @connexusId = NULLIF(@connexusId, 0)
    , @lincolnLearningId = NULLIF(@lincolnLearningId, 0)
    , @flexPointId = NULLIF(@flexPointId, 0)

;WITH SRC AS (
    SELECT ClassId, UserId 
    FROM Attendance.ClassUsers 
    WHERE ConnexusId = @connexusId 
        OR LincolnLearningId = @lincolnLearningId
        OR FlexPointId = @flexPointId    
)
MERGE Attendance.OnlineHours TRG
USING SRC ON 
    TRG.ClassId = SRC.ClassId 
    AND TRG.Date = @date 
    AND TRG.UserId = SRC.UserId
WHEN MATCHED THEN UPDATE SET 
    TRG.Value = @hours
WHEN NOT MATCHED THEN INSERT (ClassId, Date, UserId, Value)
VALUES (SRC.ClassId, @date, SRC.UserId, @hours)
;
