CREATE TYPE Common.BuzzUser AS TABLE (
	ConnexusId BIGINT
	, LincolnLearningId BIGINT
	, FlexPointId BIGINT
	, Email NVARCHAR(320)
	, Accomodations NVARCHAR(MAX)
)
