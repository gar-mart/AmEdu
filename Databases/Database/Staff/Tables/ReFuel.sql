-- Summary: 
--   This is a global configuration table so there should only ever be one
--   Related to Student.ReFuelReservations and Student.ReFuelLogs
CREATE TABLE Staff.ReFuel (
	Id INT NOT NULL DEFAULT (1)
	, MaxOpenPositions INT NOT NULL CONSTRAINT DF_Staff_ReFuel_MaxOpenPositions DEFAULT(0)
	, MaxStandbyPositions INT NOT NULL CONSTRAINT DF_Staff_ReFuel_MaxStandbyPositions DEFAULT(0)
	, BreakfastOffered BIT NOT NULL CONSTRAINT DF_Staff_ReFuel_BreakfastOffered DEFAULT(1)
	, LunchOffered BIT NOT NULL CONSTRAINT DF_Staff_ReFuel_LunchOffered DEFAULT(1)
	, UpdatedUserId INT NULL
	, UpdatedDate DATETIME2(0) NULL
	, CONSTRAINT PK_Staff_ReFuel PRIMARY KEY (Id)
	, CONSTRAINT CK_Staff_ReFuel_OnlyOne CHECK (Id = 1) 
	, CONSTRAINT FK_Staff_ReFuel_UpdatedUserId FOREIGN KEY (UpdatedUserId) REFERENCES Common.Users (Id)
)
