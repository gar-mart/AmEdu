CREATE PROCEDURE Attendance.CreateClass (
    @name NVARCHAR(200)
    , @startDate DATE
    , @endDate DATE
    , @connexusId BIGINT
    , @lincolnLearningId BIGINT
    , @flexPointId BIGINT
)
AS
SET NOCOUNT ON

DECLARE @ClassId INT

MERGE Attendance.Classes TRG
USING (SELECT @connexusId ConnexusId, @lincolnLearningId LincolnLearningId, @flexPointId FlexPointId) SRC ON 
    TRG.ConnexusId = SRC.ConnexusId 
    OR TRG.LincolnLearningId = SRC.LincolnLearningId
    OR TRG.FlexPointId = SRC.FlexPointId
WHEN MATCHED THEN UPDATE SET
    Name = COALESCE(@name, Name)
    , StartDate = COALESCE(@startDate, StartDate)
    , EndDate = COALESCE(@endDate, EndDate)
    , IsDeleted = 0
    , MarkedForDelete = 0
WHEN NOT MATCHED THEN INSERT (Name, StartDate, EndDate, ConnexusId, LincolnLearningId, FlexPointId)
VALUES (@name, @startDate, @endDate, SRC.ConnexusId, SRC.LincolnLearningId, SRC.FlexPointId);
