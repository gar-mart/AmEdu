CREATE TABLE Orientation.Step_UserElectives(
	UserId INT NOT NULL
	, GradeLevel VARCHAR(10) NOT NULL
	, Semester TINYINT NOT NULL
	, ElectiveId INT NOT NULL
	, IsLockedIn BIT NOT NULL CONSTRAINT DF_Step_UserElectives_IsLockedIn DEFAULT (0)
	, CONSTRAINT PK_Step_UserElectives PRIMARY KEY CLUSTERED(UserId, GradeLevel, Semester, ElectiveId)
)
