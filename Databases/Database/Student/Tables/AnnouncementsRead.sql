CREATE TABLE Student.AnnouncementsRead
(
	AnnouncementId INT NOT NULL
	, UserId INT NOT NULL
	, CONSTRAINT PK_AnnouncementsRead PRIMARY KEY CLUSTERED(AnnouncementId, UserId)
	, CONSTRAINT FK_AnnouncementsRead_UserId FOREIGN KEY(UserId) REFERENCES Common.Users(Id) ON DELETE CASCADE
	, CONSTRAINT FK_AnnouncementsRead_AnnouncementId FOREIGN KEY(AnnouncementId) REFERENCES Staff.Announcements(Id) ON DELETE CASCADE
)
