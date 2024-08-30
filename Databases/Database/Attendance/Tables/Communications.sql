CREATE TABLE Attendance.Communications (
	Id INT IdENTITY NOT NULL
	, UserId INT NOT NULL  --student Id
	, StaffId INT NOT NULL
	, Date DATETIME2(0) NOT NULL
	, Type TINYINT NOT NULL  -- see: communication-type.enum.ts
	, Notes NVARCHAR(MAX) NULL
	, WasSuccessful BIT NOT NULL CONSTRAINT DF_Communications_WasSuccessful DEFAULT(1)
	, AwardPoint BIT NOT NULL CONSTRAINT DF_Communications_AwardPoint DEFAULT(1)
	, CONSTRAINT PK_Communications PRIMARY KEY CLUSTERED (Id)
	, CONSTRAINT FK_Communications_UserId FOREIGN KEY (UserId) REFERENCES Common.Users (Id)
	, CONSTRAINT FK_Communications_StaffId FOREIGN KEY (StaffId) REFERENCES Common.Users (Id)
)
GO

CREATE NONCLUSTERED INDEX IX_Attendance_Communications_UserId_Date ON [Attendance].[Communications] ([UserId], [Date]) WITH (ONLINE = ON)
GO