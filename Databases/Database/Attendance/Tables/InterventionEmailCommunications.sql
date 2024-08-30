CREATE TABLE Attendance.InterventionEmailCommunications (
	InterventionId INT NOT NULL 
	, IsCompleted BIT NOT NULL
	, CompletedByUserId INT NULL
	, CompletedDate DATETIME2(0) NULL
	-- specific to this task
	, Email NVARCHAR(MAX) NULL
	, ScheduleMeetingReminderSent BIT NOT NULL CONSTRAINT DF_Attendance_InterventionEmailCommunications_ScheduleMeetingReminderSent DEFAULT (0)
	, CONSTRAINT PK_Attendance_InterventionEmailCommunications PRIMARY KEY (InterventionId)
	, CONSTRAINT FK_Attendance_InterventionEmailCommunications_InterventionId FOREIGN KEY (InterventionId) REFERENCES Attendance.Interventions (Id)
	, CONSTRAINT FK_Attendance_InterventionEmailCommunications_CompletedByUserId FOREIGN KEY (CompletedByUserId) REFERENCES Common.Users(Id)
)
