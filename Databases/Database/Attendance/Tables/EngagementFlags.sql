CREATE TABLE Attendance.EngagementFlags
(
	Id INT IDENTITY NOT NULL
	, WeekOfDate DATE NOT NULL -- Ending date column 
	, ActualCommunications INT NOT NULL
	, ActualLiveLessons INT NOT NULL
	, ActualCourseHoursSpent DECIMAL(8, 5) NOT NULL
	-- If targets are NULL, then they do not apply to the requirements of the engagement flag
	, TargetCommunications INT NULL
	, TargetLiveLessons INT NULL
	, TargetCourseHoursSpent DECIMAL(5, 2) NULL
	, ApprovedStatus BIT NULL -- 1 for approved, 0 for rejected. If NULL, no status applied yet.
	, RejectedReason NVARCHAR(250) NULL
	, InterventionReason NVARCHAR(500) NULL
	, UserId INT NOT NULL
	, StaffId INT NULL -- who approved/rejected the engagement flag
	, GradeLevel NVARCHAR(2) NULL -- history
	, MentorId INT NULL -- history
	, AcknowledgedByStudent BIT NOT NULL CONSTRAINT DF_Attendance_EngagementFlags_AcknowledgedByStudent DEFAULT (0) 
	, CONSTRAINT PK_EngagementFlags PRIMARY KEY CLUSTERED (Id)
	, CONSTRAINT FK_UserId_Users FOREIGN KEY (UserId) REFERENCES Common.Users(Id)
	, CONSTRAINT FK_StaffId_Users FOREIGN KEY (StaffId) REFERENCES Common.Users(Id)
	, CONSTRAINT CK_RejectedReason CHECK (ApprovedStatus <> 0 OR RejectedReason IS NOT NULL)
	, CONSTRAINT FK_EngagementFlags_MentorId FOREIGN KEY (MentorId) REFERENCES Common.Users(Id)
)
