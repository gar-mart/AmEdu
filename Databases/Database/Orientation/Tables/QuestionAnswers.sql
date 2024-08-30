CREATE TABLE Orientation.QuestionAnswers(
	Id INT IDENTITY NOT NULL
	, QuestionId INT NOT NULL
	, AnswerText NVARCHAR(MAX) NOT NULL
	, OrderBy SMALLINT NOT NULL
	, IsCorrectAnswer BIT NOT NULL
	, CONSTRAINT PK_QuestionAnswers PRIMARY KEY (Id)
	, CONSTRAINT FK_QuestionAnswers_Questions FOREIGN KEY(QuestionId) REFERENCES Orientation.Questions(Id) ON DELETE CASCADE
)
