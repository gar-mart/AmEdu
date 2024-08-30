CREATE TABLE Orientation.ContactContent
(
	Id INT IDENTITY NOT NULL
	, StepId INT NOT NULL
	, OrderBy INT NOT NULL

	--content type specific columns
	, UserId INT NOT NULL
	, CONSTRAINT PK_Orientation_ContactContent PRIMARY KEY (Id)
	, CONSTRAINT FK_Orientation_ContactContent FOREIGN KEY (StepId) REFERENCES Orientation.Steps (Id) ON DELETE CASCADE
	, CONSTRAINT FK_Orientation_ContactContent_UserId FOREIGN KEY (UserId) REFERENCES Common.Users (Id) ON DELETE CASCADE 
)
