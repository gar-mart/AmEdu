CREATE TABLE Attendance.LiveLessonPoints (
	Id INT IdENTITY NOT NULL
	, ClassId INT NOT NULL
	, Date DATETIME2(0) NOT NULL
	, UserId INT NOT NULL
	, StaffId INT NOT NULL
	, CreatedDate DATETIME2(7) NOT NULL
	, CONSTRAINT PK_LiveLessonPoints PRIMARY KEY CLUSTERED (Id)
	, CONSTRAINT FK_LiveLessonPoints_ClassId FOREIGN KEY (ClassId) REFERENCES Attendance.Classes(Id)
	, CONSTRAINT FK_LiveLessonPoints_UserId FOREIGN KEY(UserId) REFERENCES Common.Users(Id)
	, CONSTRAINT FK_LiveLessonPoints_StaffId FOREIGN KEY (StaffId) REFERENCES Common.Users(Id)
)
GO

CREATE NONCLUSTERED INDEX IX_LiveLessonPoints_UserId_Date
ON Attendance.LiveLessonPoints(UserId, Date)
INCLUDE(ClassId)
GO

CREATE NONCLUSTERED INDEX IX_LiveLessonPoints_Date
ON Attendance.LiveLessonPoints(Date)
INCLUDE(ClassId)

