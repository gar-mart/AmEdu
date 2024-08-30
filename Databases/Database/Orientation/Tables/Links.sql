CREATE TABLE Orientation.Links (
	Id INT IDENTITY NOT NULL
	, GradeLevel NVARCHAR(2) NULL
	, Url NVARCHAR(500) NULL
	, IsCommunityPassportForm BIT NOT NULL 
	, CONSTRAINT PK_Orientation_Links PRIMARY KEY (Id)
	, CONSTRAINT CK_Orientation_Links_GradeLevel CHECK (GradeLevel IS NULL OR GradeLevel IN ('K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'))	
	, CONSTRAINT CK_Orientation_Links_GradeLevel_IsCommunityPassportForm CHECK (IsCommunityPassportForm = 0 OR GradeLevel IS NOT NULL)
)
GO 

CREATE UNIQUE NONCLUSTERED INDEX IX_Orientation_Links_GradeLevel_IsCommunityPassportForm ON Orientation.Links (IsCommunityPassportForm, GradeLevel) WHERE IsCommunityPassportForm = 1
GO