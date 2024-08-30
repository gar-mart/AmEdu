CREATE TABLE Orientation.StepGradeLevel(
	StepId INT NOT NULL
	, GradeLevel VARCHAR(10) NOT NULL
	, CONSTRAINT PK_StepGradeLevel PRIMARY KEY CLUSTERED(StepId, GradeLevel)
	, CONSTRAINT FK_StepGradeLevel_Step FOREIGN KEY(StepId) REFERENCES Orientation.Steps(Id)
)
