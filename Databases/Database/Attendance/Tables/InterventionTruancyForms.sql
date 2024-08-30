CREATE TABLE Attendance.InterventionTruancyForms (
	InterventionId INT NOT NULL 
	, IsCompleted BIT NOT NULL
	, CompletedByUserId INT NULL
	, CompletedDate DATETIME2(0) NULL
	-- specific to this task
	, MarkedCompleted BIT NOT NULL CONSTRAINT DF_Attendance_InterventionTruancyForms DEFAULT (0)
	, CONSTRAINT PK_Attendance_InterventionTruancyForms PRIMARY KEY (InterventionId)
	, CONSTRAINT FK_Attendance_InterventionTruancyForms_InterventionId FOREIGN KEY (InterventionId) REFERENCES Attendance.Interventions (Id)
	, CONSTRAINT FK_Attendance_InterventionTruancyForms_CompletedByUserId FOREIGN KEY (CompletedByUserId) REFERENCES Common.Users(Id)
)
