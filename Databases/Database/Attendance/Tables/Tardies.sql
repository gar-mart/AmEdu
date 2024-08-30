CREATE TABLE Attendance.Tardies (
	ClassId INT NOT NULL
	, Date DATE NOT NULL
	, UserId INT NOT NULL
	, StaffId INT NOT NULL
	, Type TINYINT NOT NULL -- 1 = Late, 2 = In and Out, 3 = Left Early, 4 = Disengaged
	, Comment NVARCHAR(500) NULL
	, CreatedDate DATETIME2(7) NOT NULL
	, CONSTRAINT PK_Tardyness PRIMARY KEY CLUSTERED (ClassId, UserId, Date)
	, CONSTRAINT FK_Tardyness_ClassId FOREIGN KEY (ClassId) REFERENCES Attendance.Classes(Id)
	, CONSTRAINT FK_Tardyness_UserId FOREIGN KEY(UserId) REFERENCES Common.Users(Id)
	, CONSTRAINT FK_Tardyness_StaffId FOREIGN KEY (StaffId) REFERENCES Common.Users(Id)
)
GO

CREATE NONCLUSTERED INDEX IX_Attendance_Tardies_UserId_Date
ON Attendance.Tardies(UserId, Date)
GO
