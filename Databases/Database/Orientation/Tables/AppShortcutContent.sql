CREATE TABLE Orientation.AppTileMetadataContent (
	Id INT IDENTITY NOT NULL
	, StepId INT NOT NULL
	, OrderBy INT NOT NULL

	--content type specific columns
	, AppTileMetadataId INT NOT NULL
	, CONSTRAINT PK_Orientation_AppTileMetadataContent PRIMARY KEY (Id)
	, CONSTRAINT FK_Orientation_AppTileMetadataContent FOREIGN KEY (StepId) REFERENCES Orientation.Steps (Id) ON DELETE CASCADE
	, CONSTRAINT FK_Orientation_AppTileMetadataContent_MetadataId FOREIGN KEY (AppTileMetadataId) REFERENCES Student.AppTileMetadata (Id) ON DELETE CASCADE
)
