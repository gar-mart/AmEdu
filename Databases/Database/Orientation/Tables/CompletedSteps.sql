CREATE TABLE Orientation.CompletedSteps(
	UserId INT NOT NULL
	, StepId INT NOT NULL
	, CompletedDate DATETIME2(0) NOT NULL CONSTRAINT DF_CompletedSteps_CompletedDate DEFAULT(SYSDATETIME())
	, CONSTRAINT PK_CompletedSteps PRIMARY KEY CLUSTERED(UserId, StepId)
	, CONSTRAINT FK_CompletedSteps_Users FOREIGN KEY(UserId) REFERENCES Common.Users(Id)
	, CONSTRAINT FK_CompletedSteps_Step FOREIGN KEY(StepId) REFERENCES Orientation.Steps(Id)
)
