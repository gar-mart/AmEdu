CREATE TABLE Student.StudentResourceGradeLevel
(
	StudentResourceId INT NOT NULL
	, GradeLevel NVARCHAR(10) NOT NULL
	, CONSTRAINT PK_StudentResourceGradeLevel PRIMARY KEY CLUSTERED (StudentResourceId, GradeLevel)
	, CONSTRAINT FK_StudentResourceGradeLevel_StudentResourceId FOREIGN KEY (StudentResourceId) REFERENCES Student.StudentResources (Id)
)
