CREATE TABLE Orientation.YouTubeVideoContent (
	-- columns each content type should have
	Id INT IDENTITY NOT NULL
	, StepId INT NOT NULL
	, OrderBy INT NOT NULL
	
	-- columns specific to this content type
	, VideoId NVARCHAR(25) NOT NULL -- currently the length is set at 11, but no commitments at staying this length
	, CONSTRAINT PK_Orientation_YouTubeVideoContent PRIMARY KEY (Id)
	, CONSTRAINT FK_Orientation_YouTubeVideoContent FOREIGN KEY (StepId) REFERENCES Orientation.Steps (Id) ON DELETE CASCADE
)
