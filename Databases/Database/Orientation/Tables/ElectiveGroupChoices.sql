CREATE TABLE Orientation.ElectiveGroupChoices
(
	Id INT IDENTITY NOT NULL 
	, ElectiveId INT NOT NULL
	, ElectiveGroupId INT NOT NULL
	, CONSTRAINT PK_ElectiveGroupChoices_Id PRIMARY KEY (Id)
	, CONSTRAINT FK_ElectiveGroupChoices_ElectiveId FOREIGN KEY (ElectiveId) REFERENCES Orientation.Electives (Id)
	, CONSTRAINT FK_ElectiveGroupChoices_ElectiveGroupId FOREIGN KEY (ElectiveGroupId) REFERENCES Orientation.ElectiveGroups (Id)
)
