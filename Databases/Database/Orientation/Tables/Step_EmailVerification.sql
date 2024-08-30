CREATE TABLE Orientation.Step_EmailVerification(
	UserId INT NOT NULL
	, VerificationCode CHAR(6) NULL
	, IsVerified BIT NOT NULL CONSTRAINT DF_Step_EmailVerification_IsVerified DEFAULT(0)
	, CONSTRAINT PK_Step_EmailVerification PRIMARY KEY CLUSTERED(UserId)
	, CONSTRAINT FK_Step_EmailVerification_Users FOREIGN KEY(UserId) REFERENCES Common.Users(Id)
)
