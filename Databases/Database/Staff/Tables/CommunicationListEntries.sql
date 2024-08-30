CREATE TABLE Staff.CommunicationListEntries (
	CommunicationListId INT NOT NULL
	, UserId INT NOT NULL
	, IncludeStudent BIT NOT NULl
	, IncludeGuardian1 BIT NOT NULL
	, IncludeGuardian2 BIT NOT NULL
	, IncludeStaff BIT NOT NULL CONSTRAINT DF_Staff_CommunicationListEntries_IncludeStaff DEFAULT (0)
	, IncludeMentor BIT NOT NULL CONSTRAINT DF_Staff_CommunicationListEntries_IncludeMentor DEFAULT (0)
	, CONSTRAINT PK_Staff_CommunicationListEntry PRIMARY KEY (CommunicationListId, UserId)
	, CONSTRAINT FK_Staff_CommunicationListEntry_CommunicationListId FOREIGN KEY (CommunicationListId) REFERENCES Staff.CommunicationLists (Id) ON DELETE CASCADE
	, CONSTRAINT FK_Staff_CommunicationLIstEntry_UserId FOREIGN KEY (UserId) REFERENCES Common.Users (Id)
)
GO

CREATE NONCLUSTERED INDEX IX_Staff_CommunicationListEntry_UserId ON Staff.CommunicationListEntries(UserId)
GO