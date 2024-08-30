CREATE PROCEDURE Common.ImportBuzzUsers (
	@users Common.BuzzUser READONLY
)
AS
SET NOCOUNT ON

MERGE Common.Users TRG USING @users SRC ON SRC.Email = TRG.Email
WHEN MATCHED THEN UPDATE SET
	Accomodations = SRC.Accomodations

	-- in case the user exists in multiple APIs, don't null out the other value.
	, ConnexusId = ISNULL(SRC.ConnexusId, TRG.ConnexusId)
	, LastConnexusSync = IIF(SRC.ConnexusId IS NULL, LastConnexusSync, SYSUTCDATETIME())
	, LincolnLearningId = ISNULL(SRC.LincolnLearningId, TRG.LincolnLearningId)
	, LastLincolnLearningSync = IIF(SRC.LincolnLearningId IS NULL, LastLincolnLearningSync, SYSUTCDATETIME())
	, FlexPointId = ISNULL(SRC.FlexPointId, TRG.FlexPointId)
	, LastFlexPointSync = IIF(SRC.FlexPointId IS NULL, LastFlexPointSync, SYSUTCDATETIME())
;
