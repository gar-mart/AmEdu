CREATE TABLE Student.AppTiles
(
	Id INT IdENTITY NOT NULL
	, UserId INT NOT NULL
	, MetadataId INT NOT NULL
	, Show BIT NOT NULL CONSTRAINT DF_Show DEFAULT(1)
	, OrderBy INT NOT NULL
	, CONSTRAINT PK_AppTiles PRIMARY KEY CLUSTERED(Id)
	, CONSTRAINT FK_Users_UserId FOREIGN KEY(UserId) REFERENCES Common.Users(Id) ON DELETE CASCADE
	, CONSTRAINT FK_AppTileMetadata_MetadataId FOREIGN KEY(MetadataId) REFERENCES Student.AppTileMetadata(Id) ON DELETE CASCADE
)
GO

CREATE INDEX IX_Student_AppTiles_MetadataId ON Student.AppTiles (MetadataId)
GO

CREATE INDEX IX_Student_AppTiles_UserId ON Student.AppTiles (UserId)
GO
