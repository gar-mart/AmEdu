CREATE TABLE Attendance.Points (
	Id INT IdENTITY(1,1) NOT NULL
	, UserId INT NOT NULL
	, StaffId INT NOT NULL
	, Date DATETIME2(0) NOT NULL
	, CreatedDate DATETIME2(7) NOT NULL
	, Type TINYINT NOT NULL  --1 = Communication, 2 = Integrity, 3 = Stewardship, 4 = Spend, 5 = Lesson, 6 = Respect, 7 = Engagement
	, Value SMALLINT NOT NULL
	, CommunicationId INT NULL
	, LiveLessonId INT NULL
	, Comments NVARCHAR(500) NULL
	, UserSource TINYINT NULL -- NULL = unknown, 1 = Mentor, 2 = Teacher, 4 = Other
	, PageSource TINYINT NULL -- NULL = unknown, 1 = Students Page, 2 = Live Lessons Page
	, GradeLevel NVARCHAR(2) NULL -- history
	, MentorId INT NULL -- history
	, CONSTRAINT PK_Points PRIMARY KEY CLUSTERED (Id)
	, CONSTRAINT UQ_Points UNIQUE NONCLUSTERED (UserId, StaffId, CreatedDate)
	, CONSTRAINT FK_Points_UserId FOREIGN KEY (UserId) REFERENCES Common.Users(Id)
	, CONSTRAINT FK_Points_CommunicationId FOREIGN KEY (CommunicationId) REFERENCES Attendance.Communications (Id)
	, CONSTRAINT FK_Points_StaffId FOREIGN KEY (StaffId) REFERENCES Common.Users(Id)
	, CONSTRAINT FK_Points_LiveLessonId FOREIGN KEY (LiveLessonId) REFERENCES Attendance.LiveLessonPoints (Id) ON DELETE CASCADE 
	, CONSTRAINT FK_Points_MentorId FOREIGN KEY (MentorId) REFERENCES Common.Users(Id)
)
GO

CREATE NONCLUSTERED INDEX IX_Points_UserId_Date
ON Attendance.Points(UserId, Date)
INCLUDE(Type, Value)
WHERE Type = 1
GO

CREATE NONCLUSTERED INDEX IX_Attendance_Points_UserId_Type ON [Attendance].[Points] ([UserId], [Type]) INCLUDE ([Comments], [CreatedDate], [Date], [StaffId], [Value]) WITH (ONLINE = ON)
GO