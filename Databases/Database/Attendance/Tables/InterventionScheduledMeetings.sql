CREATE TABLE Attendance.InterventionScheduledMeetings (
	InterventionId INT NOT NULL 
	, IsCompleted BIT NOT NULL
	, CompletedByUserId INT NULL
	, CompletedDate DATETIME2(0) NULL
	-- specific to this task
	, DateOfMeeting DATE NULL
	, Status TINYINT NULL -- NULL: no selection, 0: Meeting Occurred, 1: No Show
	, CONSTRAINT PK_Attendance_InterventionScheduledMeetings PRIMARY KEY (InterventionId)
	, CONSTRAINT FK_Attendance_InterventionScheduledMeetings_InterventionId FOREIGN KEY (InterventionId) REFERENCES Attendance.Interventions (Id)
	, CONSTRAINT FK_Attendance_InterventionScheduledMeetings_CompletedByUserId FOREIGN KEY (CompletedByUserId) REFERENCES Common.Users(Id)
)
