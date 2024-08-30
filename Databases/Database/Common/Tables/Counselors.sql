CREATE TABLE Common.Counselors(
	GradeLevel NVARCHAR(2) NOT NULL
	, UserId INT NOT NULL
	, CONSTRAINT PK_Common_Counselors PRIMARY KEY CLUSTERED(GradeLevel, UserId)
	, CONSTRAINT FK_Common_Counselors_UserId FOREIGN KEY (UserId) REFERENCES Common.Users(Id)
)
