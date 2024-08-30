CREATE TABLE Orientation.Step_SendUsASelfie(
	UserId INT NOT NULL
	, Picture VARCHAR(MAX) NOT NULL
	, CONSTRAINT PK_Step_Step_SendUsASelfie PRIMARY KEY CLUSTERED(UserId)
	, CONSTRAINT FK_Step_Step_SendUsASelfie_Users FOREIGN KEY(UserId) REFERENCES Common.Users(Id)
)
