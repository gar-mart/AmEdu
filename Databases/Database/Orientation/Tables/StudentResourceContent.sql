CREATE TABLE Orientation.StudentResourceContent
(
	Id INT IDENTITY NOT NULL
	, StepId INT NOT NULL
	, OrderBy INT NOT NULL

	--content type specific columns
	, StudentResourceId INT NOT NULL
	, CONSTRAINT PK_Orientation_StudentResourceContent PRIMARY KEY (Id)
	, CONSTRAINT FK_Orientation_StudentResourceContent FOREIGN KEY (StepId) REFERENCES Orientation.Steps (Id) ON DELETE CASCADE
)
