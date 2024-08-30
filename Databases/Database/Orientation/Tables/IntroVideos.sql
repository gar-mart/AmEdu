CREATE TABLE Orientation.IntroVideos
(
	MentorId INT NOT NULL 
	, Link NVARCHAR(500)
	, CONSTRAINT PK_IntroVideos PRIMARY KEY CLUSTERED(MentorId)
	, CONSTRAINT FK_IntroVideos_MentorId FOREIGN KEY (MentorId) REFERENCES Common.Users (Id)
)
