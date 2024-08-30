CREATE TYPE Tvp.ClassUserWork AS TABLE
(
	UserConnexusId BIGINT NULL
	, ConnexusEnrollmentId BIGINT NULL
	, UserLincolnLearningId BIGINT NULL
	, LincolnLearningEnrollmentId BIGINT NULL
	, UserFlexPointId BIGINT NULL
	, FlexPointEnrollmentId BIGINT NULL
	, ItemId NVARCHAR(500) NOT NULL
	, WorkId INT NOT NULL
	, SubmittedDate DATETIME2(0) NULL
	, ScoredDate DATETIME2(0) NULL
	, PointsPossible DECIMAL(10, 2) NOT NULL
	, PointsAchieved DECIMAL(10, 2) NOT NULL
)
