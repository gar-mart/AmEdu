CREATE TABLE Orientation.SignatureContent (
	-- columns each content type should have
	Id INT IDENTITY NOT NULL
	, StepId INT NOT NULL
	, OrderBy INT NOT NULL
	
	-- columns specific to this content type
    , Signer NVARCHAR(100) NOT NULL
	, Disclaimer NVARCHAR(MAX) NOT NULL

	, CONSTRAINT PK_Orientation_SignatureContent PRIMARY KEY (Id)
	, CONSTRAINT FK_Orientation_SignatureContent FOREIGN KEY (StepId) REFERENCES Orientation.Steps (Id) ON DELETE CASCADE
)