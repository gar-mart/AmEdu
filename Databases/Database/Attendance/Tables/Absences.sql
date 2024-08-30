CREATE TABLE Attendance.Absences (
	Id INT IDENTITY NOT NULL
	, UserId INT NOT NULL
	, StartDate DATE NOT NULL
	, EndDate DATE NOT NULL
	, Reason NVARCHAR(255) NOT NULL
	, CreatedByUserId INT NOT NULL
	, CreatedDate DATETIME2(0) NOT NULL CONSTRAINT DF_Attendance_Absences_CreatedDate DEFAULT (SYSUTCDATETIME())
	, CONSTRAINT PK_Attendance_Absences PRIMARY KEY (Id)
	, CONSTRAINT FK_Attendance_Absences_UserId FOREIGN KEY (UserId) REFERENCES Common.Users(Id)
	, CONSTRAINT FK_Attendance_Absences_CreatedByUserId FOREIGN KEY (CreatedByUserId) REFERENCES Common.Users(Id)
	, CONSTRAINT CK_Attendance_Absences_StartDate_EndDate CHECK (StartDate <= EndDate)
)