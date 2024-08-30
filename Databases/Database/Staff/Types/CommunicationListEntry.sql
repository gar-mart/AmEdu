CREATE TYPE Staff.CommunicationListEntry AS TABLE (
	UserId INT NOT NULL
	, IncludeStudent BIT NOT NULl
	, IncludeGuardian1 BIT NOT NULL
	, IncludeGuardian2 BIT NOT NULL
	, IncludeMentor BIT NOT NULL
	, IncludeStaff BIT NOT NULL
)
