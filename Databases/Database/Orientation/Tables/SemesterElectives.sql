CREATE TABLE Orientation.SemesterElectives(
	GradeLevel VARCHAR(10) NOT NULL
	, Semester TINYINT NOT NULL
	, ElectiveId INT NOT NULL
	, CONSTRAINT PK_ElectivesSemester PRIMARY KEY CLUSTERED(GradeLevel, Semester, ElectiveId)
	, CONSTRAINT FK_ElectivesSemester_ElectiveId FOREIGN KEY (ElectiveId) REFERENCES Orientation.Electives(Id)
)
