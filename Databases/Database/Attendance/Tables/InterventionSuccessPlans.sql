CREATE TABLE Attendance.InterventionSuccessPlans (
	InterventionId INT NOT NULL 
	, IsCompleted BIT NOT NULL
	, CompletedByUserId INT NULL
	, CompletedDate DATETIME2(0) NULL
	-- specific to this task
	, SuccessPlanCreatedDate DATE NULL
	, SuccessPlanNotCreated BIT NOT NULL CONSTRAINT DF_Attendance_InterventionSuccessPlans_SuccessPlanNotCreated DEFAULT (0)
	, CONSTRAINT PK_Attendance_InterventionSuccessPlans PRIMARY KEY (InterventionId)
	, CONSTRAINT FK_Attendance_InterventionSuccessPlans_InterventionId FOREIGN KEY (InterventionId) REFERENCES Attendance.Interventions (Id)
	, CONSTRAINT FK_Attendance_InterventionSuccessPlans_CompletedByUserId FOREIGN KEY (CompletedByUserId) REFERENCES Common.Users(Id)
)
