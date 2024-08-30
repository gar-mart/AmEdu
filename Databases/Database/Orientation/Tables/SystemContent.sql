CREATE TABLE Orientation.SystemContent
(
	Id INT IDENTITY NOT NULL
	, StepId INT NOT NULL
	, OrderBy INT NOT NULL

	-- maps to an orientation "system" component
		-- 0 = Send Us a Selfie
		-- 1 = Intro Videos
		-- 2 = Connection Survey
		-- 3 = Outlook Email Verification
		-- 4 = Semester 1 Electives
		-- 5 = Semester 2 Electives 
	, ComponentId TINYINT NOT NULL 	

	, CONSTRAINT PK_Orientation_SystemContent PRIMARY KEY (Id)
	, CONSTRAINT FK_Orientation_SystemContent FOREIGN KEY (StepId) REFERENCES Orientation.Steps (Id) ON DELETE CASCADE
)
