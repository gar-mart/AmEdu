CREATE TABLE Orientation.UserAnswers(
	UserId INT NOT NULL
	, QuestionId INT NOT NULL
	, AnswerId INT NOT NULL
	, CONSTRAINT PK_UserAnswers PRIMARY KEY CLUSTERED(UserId, QuestionId)
	, CONSTRAINT FK_UserAnswers_Users FOREIGN KEY(UserId) REFERENCES Common.Users(Id)
	, CONSTRAINT FK_UserAnswers_QuestionAnswers FOREIGN KEY(AnswerId) REFERENCES Orientation.QuestionAnswers(Id) ON DELETE CASCADE
)
