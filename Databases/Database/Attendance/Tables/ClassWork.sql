CREATE TABLE Attendance.ClassWork (
	ClassId INT NOT NULL
	, ItemId NVARCHAR(500) NOT NULL -- this the ID that comes from the API.
	, Title NVARCHAR(200) NOT NULL
	, Type NVARCHAR(20) NULL -- some examples are Assignment, Assessment, AssetLink, CustomActivity, etc.
	, DueDate DATETIME2(0) NULL
	, DueDateGrace INT NOT NULL -- we are assuming this is a value represented in minutes. A common number we are seeing is 20160 which is exactly 2 weeks
	, Gradable BIT NOT NULL 
	, IsDeleted BIT NOT NULL
	, CONSTRAINT PK_Attendance_ClassWork PRIMARY KEY (ClassId, ItemId)
	, CONSTRAINT FK_Attendance_ClassWork_ClassId FOREIGN KEY (ClassId) REFERENCES Attendance.Classes (Id)
	
)
GO 

CREATE NONCLUSTERED INDEX IX_Attendance_ClassWork_DueDate ON Attendance.ClassWork (DueDate)
GO


CREATE NONCLUSTERED INDEX IX_Attendance_ClassWork_ClassId_DueDate
ON Attendance.ClassWork (ClassId, DueDate)
INCLUDE (DueDateGrace, Gradable, IsDeleted)
WHERE IsDeleted = 0 AND Gradable = 1
GO


