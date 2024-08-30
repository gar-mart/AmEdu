CREATE TABLE Attendance.OnlineHours (
	ClassId INT NOT NULL
	, Date DATETIME2(0) NOT NULL
	, UserId INT NOT NULL
	, Value DECIMAL(7,5) NOT NULL -- need more precision on hours 
	, CONSTRAINT PK_OnlineTime PRIMARY KEY CLUSTERED (ClassId, Date, UserId)
	, CONSTRAINT FK_OnlineTime_ClassId FOREIGN KEY (ClassId) REFERENCES Attendance.Classes(Id)
	, CONSTRAINT FK_OnlineTime_UserId FOREIGN KEY(UserId) REFERENCES Common.Users(Id)
)
GO

CREATE NONCLUSTERED INDEX OnlineHours_Date
ON Attendance.OnlineHours (Date)
INCLUDE (Value)
GO

CREATE NONCLUSTERED INDEX IX_Attendance_OnlineHours_UserId_Date ON [Attendance].[OnlineHours] ([UserId], [Date]) INCLUDE ([Value]) WITH (ONLINE = ON)
GO