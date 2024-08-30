CREATE TABLE Attendance.ClassUserWork (
	ClassId INT NOT NULL
	, UserId INT NOT NULL
	, ItemId NVARCHAR(500) NOT NULL 
	, WorkId INT NOT NULL -- This refers to the submission attempt #. Students can turn in the same assignment more than once.
	, ConnexusEnrollmentId BIGINT NOT NULL CONSTRAINT DF_Attendance_ClassUserWork_ConnexusEnrollmentId DEFAULT(0)
	, LincolnLearningEnrollmentId BIGINT NOT NULL CONSTRAINT DF_Attendance_ClassUserWork_LincolnLearningEnrollmentId DEFAULT(0)
	, FlexPointEnrollmentId BIGINT NOT NULL CONSTRAINT DF_Attendance_ClassUserWork_FlexPointEnrollmentId DEFAULT(0)
	, SubmittedDate DATETIME2(0) NOT NULL 
	, ScoredDate DATETIME2(0) NULL 
	, PointsPossible DECIMAL(10, 2) NOT NULL 
	, PointsAchieved DECIMAL(10, 2) NOT NULL
	, IsDeleted BIT NOT NULL
	, CONSTRAINT PK_Attendance_ClassUserWork PRIMARY KEY (ClassId, ItemId, UserId, WorkId, LincolnLearningEnrollmentId, ConnexusEnrollmentId, FlexPointEnrollmentId)
	, CONSTRAINT FK_Attendance_ClassUserWork_ClassId_ItemId FOREIGN KEY (ClassId, ItemId) REFERENCES Attendance.ClassWork (ClassId, ItemId)
	, CONSTRAINT FK_Attendance_ClassUserWork_UserId FOREIGN KEY (UserId) REFERENCES Common.Users (Id)
)
GO

CREATE NONCLUSTERED INDEX IX_Attendance_ClassUserWork_UserId ON Attendance.ClassUserWork (UserId)
GO

CREATE NONCLUSTERED INDEX IX_Attendance_ClassUserWork_SubmittedDate ON Attendance.ClassUserWork (SubmittedDate)
GO

CREATE NONCLUSTERED INDEX IX_Attendance_ClassUserWork_IsDeleted ON Attendance.ClassUserWork (IsDeleted)
GO

CREATE NONCLUSTERED INDEX IX_Attendance_ClassUserWork_ConnexusEnrollmentId_ItemId_LincolnLearningEnrollmentId_FlexPointEnrollmentId ON [Attendance].[ClassUserWork] ([ConnexusEnrollmentId], [ItemId], [LincolnLearningEnrollmentId], [FlexPointEnrollmentId]) INCLUDE ([IsDeleted], [SubmittedDate]) WITH (ONLINE = ON)
GO