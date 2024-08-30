CREATE TABLE Staff.CommunicationLists (
	Id INT IDENTITY NOT NULL 
	, StaffId INT NOT NULL
	, Name NVARCHAR(50) NOT NULL
	, CONSTRAINT PK_Staff_CommunicationLists PRIMARY KEY (Id)
	, CONSTRAINT FK_Staff_CommunicationLists_StaffId FOREIGN KEY (StaffId) REFERENCES Common.Users(Id)
)
GO

CREATE NONCLUSTERED INDEX IX_Staff_CommunicationLists_StaffId ON Staff.CommunicationLists(StaffId)
GO