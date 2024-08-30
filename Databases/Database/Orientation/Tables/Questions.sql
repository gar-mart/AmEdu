CREATE TABLE Orientation.Questions(
	Id INT IDENTITY NOT NULL
	, StepId INT NULL -- todo: remove when new orientation is ready
	, QuizContentId INT NULL -- todo: make not null when new orientation is ready
	, QuestionText NVARCHAR(MAX) NOT NULL
	, OrderBy SMALLINT NOT NULL
	, CONSTRAINT PK_Questions PRIMARY KEY CLUSTERED(Id)
	, CONSTRAINT FK_Questions_Steps FOREIGN KEY(StepId) REFERENCES Orientation.Steps(Id) -- todo: remove when new orientation is ready
	, CONSTRAINT FK_Questions_QuizContent FOREIGN KEY (QuizContentId) REFERENCES Orientation.QuizContent (Id) ON DELETE CASCADE
)
