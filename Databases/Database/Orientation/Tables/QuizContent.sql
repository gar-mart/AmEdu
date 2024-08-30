CREATE TABLE Orientation.QuizContent (
	-- columns each content type should have
	Id INT IDENTITY NOT NULL
	, StepId INT NOT NULL
	, OrderBy INT NOT NULL
	, CONSTRAINT PK_Orientation_QuizContent PRIMARY KEY (Id)
	, CONSTRAINT FK_Orientation_QuizContent FOREIGN KEY (StepId) REFERENCES Orientation.Steps (Id) ON DELETE CASCADE
)
