CREATE TABLE Orientation.ElectiveGroups (
	Id INT NOT NULL IDENTITY, 
    Semester INT NOT NULL, 
    NumberOfRequiredChoices INT NOT NULL
    , CONSTRAINT PK_ElectiveGroups_Id PRIMARY KEY (Id)
)
