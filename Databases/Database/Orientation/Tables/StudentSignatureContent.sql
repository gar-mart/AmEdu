CREATE TABLE Orientation.StudentSignatureContent (
	SignatureContentId INT NOT NULL
	, StudentId INT NOT NULL
	, Signature NVARCHAR(MAX) NULL 
	, SignDate DATE NULL

	, CONSTRAINT PK_Orientation_StudentSignatureContent PRIMARY KEY (SignatureContentId, StudentId)
	, CONSTRAINT FK_Orientation_StudentSignatureContent_SignatureContentId FOREIGN KEY (SignatureContentId) REFERENCES Orientation.SignatureContent (Id) ON DELETE CASCADE
	, CONSTRAINT FK_Orientation_StudentSignatureContent_StudentId FOREIGN KEY (StudentId) REFERENCES Common.Users (Id) 
)