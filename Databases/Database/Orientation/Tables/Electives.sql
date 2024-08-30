CREATE TABLE Orientation.Electives(
	Id INT IdENTITY NOT NULL
	, Name NVARCHAR(500) NOT NULL
	, IsCommunityPassportElective BIT NOT NULL CONSTRAINT DF_IsCommunityPassportElective DEFAULT (0)
	, HasPrerequisite BIT NOT NULL CONSTRAINT DF_HasPrerequisite DEFAULT (0)
	, IsCommunityPassportElectiveAlternate BIT NOT NULL CONSTRAINT DF_IsCommunityPassportElectiveAlternate DEFAULT (0)
	-- these two "ChoiceGroup" columns will enforce that the student chooses x number of choices from the group, no more, no less
	-- example:
	-- CHOICE #1:
	-- Spanish
	-- French
	-- CHOICE #2:
	-- Art
	-- Music
	-- PE
	-- ChoiceGroupId = 1 and ChoiceGroupElectivesRequired = 1 means the student must choose either Spanish or French
	, ChoiceGroupId INT NULL
	, ChoiceGroupElectivesRequired INT NULL
	, CONSTRAINT PK_Electives PRIMARY KEY CLUSTERED(Id)
)
