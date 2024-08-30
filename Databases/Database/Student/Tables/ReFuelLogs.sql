-- Summary: Check in / out logs for RE:Fuel
CREATE TABLE Student.ReFuelLogs (
	Id INT IDENTITY NOT NULL
	, StudentId INT NOT NULL
	, [Date] DATE NOT NULL 
	, CheckedIn DATETIME2(0) NOT NULL
	, CheckedOut DATETIME2(0) NULL
	, CreatedUserId INT NOT NULL
	, CreatedDate DATETIME2(0) NOT NULL CONSTRAINT DF_Student_ReFuelLogs DEFAULT(SYSUTCDATETIME())
	, UpdatedUserId INT NULL
	, UpdatedDate DATETIME2(0) NULL
	, CONSTRAINT PK_Student_ReFuelLogs PRIMARY KEY (Id)
	, CONSTRAINT UQ_Student_ReFuelLogs UNIQUE NONCLUSTERED (StudentId, [Date], CheckedIn) -- a student can have several check ins per day
	, CONSTRAINT FK_Student_ReFuelLogs_StudentId FOREIGN KEY (StudentId) REFERENCES Common.Users (Id)
	, CONSTRAINT FK_Student_ReFuelLogs_CreatedByUserId FOREIGN KEY (CreatedUserId) REFERENCES Common.Users (Id)
	, CONSTRAINT FK_Student_ReFuelLogs_UpdatedByUserId FOREIGN KEY (UpdatedUserId) REFERENCES Common.Users (Id)
	, CONSTRAINT FK_Student_ReFuelLogs_ReFuelReservations FOREIGN KEY (StudentId, [Date]) REFERENCES Student.ReFuelReservations (StudentId, [Date])
)
