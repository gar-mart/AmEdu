CREATE TABLE Attendance.InterventionEmailAttachments
(
	InterventionLevel TINYINT NOT NULL
	, Filename NVARCHAR(200) NOT NULL
	, CONSTRAINT PK_InterventionEmailAttachments PRIMARY KEY CLUSTERED (InterventionLevel, Filename)
)
