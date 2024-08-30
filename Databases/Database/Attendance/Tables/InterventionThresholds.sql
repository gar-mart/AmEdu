CREATE TABLE Attendance.InterventionThresholds (
	Id INT IdENTITY NOT NULL
	, Grade NVARCHAR(10) NOT NULL -- K, 1-12 (using same datatype as Common.Users)
	-- if any of the minimum thresholds are null, then the metric does not apply
	, MinimumCommunicationLogs INT NULL 
	, MinimumCourseHoursSpent DECIMAL(5, 2) NULL
	, MinimumLiveLessons INT NULL 
	, ExpectedCommunicationLogs INT NOT NULL CONSTRAINT DF_InterventionThresholds_ExpectedCommunications DEFAULT(0)
	, ExpectedLiveLessons INT NOT NULL CONSTRAINT DF_InterventionThresholds_ExpectedLiveLessons DEFAULT(0)
	, NumberOfRequirements INT NOT NULL CONSTRAINT DF_InterventionThresholds_NumberOfRequirements DEFAULT(2) -- 2 is the current rule for the school, but they may want to change this in the future, so we are giving them a configuration field
	, CONSTRAINT PK_InterventionThreshold PRIMARY KEY CLUSTERED (Id)
	, CONSTRAINT CK_InterventionThreshold_ExpectedGEMinimum CHECK (
		ISNULL(MinimumCommunicationLogs, 0)<= ExpectedCommunicationLogs 
		AND ISNULL(MinimumLiveLessons, 0) <= ExpectedLiveLessons
	)
)
