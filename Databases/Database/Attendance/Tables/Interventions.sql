CREATE TABLE Attendance.Interventions (
	Id INT NOT NULL -- this ID is also the Engagement Flag ID that triggered it to be created. 
	, EngagementFlagId AS Id
	, SchoolYear Common.SchoolYear NOT NULL -- if 2021, then the school year is 2021-2022
	, Level TINYINT NOT NULL -- 0: Warning, then levels 1 through 4
	, Status TINYINT NOT NULL -- 0: In Progress, 1: Completed, 2: Not Completed, 3: Voided
	, GeneratedByUserId INT NULL -- if null, then the system generated it
	, GeneratedDate DATETIME2(0) NOT NULL CONSTRAINT DF_Attendance_Interventions_GeneratedDate DEFAULT (SYSUTCDATETIME())
	, CompletedByUserId INT NULL -- if null, then the system completed it
	, CompletedDate DATETIME2(0) NULL -- expressed in UTC
	, LogOnly BIT NOT NULL CONSTRAINT DF_Attendance_Interventions_LogOnly DEFAULT(0) -- this record is purely informational only if this is set to 1
	, CONSTRAINT PK_Attendance_Interventions PRIMARY KEY (Id)
	, CONSTRAINT FK_Attendance_Interventions_Id FOREIGN KEY (Id) REFERENCES Attendance.EngagementFlags(Id)
	, CONSTRAINT FK_Attendance_Interventions_GeneratedByUserId FOREIGN KEY (GeneratedByUserId) REFERENCES Common.Users(Id)
	, CONSTRAINT FK_Attendance_Interventions_CompletedByUserId FOREIGN KEY (CompletedByUserId) REFERENCES Common.Users(Id)
)
