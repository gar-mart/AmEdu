CREATE TABLE Student.AppTileGradeLevel (
	AppTileMetadataId INT NOT NULL
	, GradeLevel NVARCHAR(10) NOT NULL
	, CONSTRAINT PK_AppTileGradeLevel PRIMARY KEY CLUSTERED (AppTileMetadataId, GradeLevel)
	, CONSTRAINT FK_AppTileGradeLevel_AppTileMetadataId FOREIGN KEY (AppTileMetadataId) REFERENCES Student.AppTileMetadata (Id)
)
