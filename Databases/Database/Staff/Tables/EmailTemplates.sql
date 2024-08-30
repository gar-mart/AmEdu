CREATE TABLE Staff.EmailTemplates (
	Id INT IDENTITY NOT NULL 
	, UserId INT NOT NULL
	, Name NVARCHAR(50) NOT NULL
	, Html NVARCHAR(MAX)
	, CONSTRAINT PK_Staff_EmailTemplates PRIMARY KEY (Id)
	, CONSTRAINT FK_Staff_EmailTemplates_UserId FOREIGN KEY (UserId) REFERENCES Common.Users (Id)
	, CONSTRAINT UQ_Staff_EmailTemplates_UserId_Name UNIQUE NONCLUSTERED (UserId, Name)
)
GO

CREATE NONCLUSTERED INDEX IX_Staff_EmailTemplates_UserId ON Staff.EmailTemplates (UserId)
GO
