CREATE TABLE Orientation.TextImageContent (
	-- columns each content type should have
	Id INT IDENTITY NOT NULL
	, StepId INT NOT NULL
	, OrderBy INT NOT NULL
	
	-- columns specific to this content type
	, Content NVARCHAR(MAX) NULL 
	, CONSTRAINT PK_Orientation_TextImageContent PRIMARY KEY (Id)
	, CONSTRAINT FK_Orientation_TextImageContent FOREIGN KEY (StepId) REFERENCES Orientation.Steps (Id) ON DELETE CASCADE
)
