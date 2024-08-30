CREATE TABLE Security.AspNetGroups (
    Id UNIQUEIDENTIFIER CONSTRAINT DF_Security_AspNetGroups_Id  DEFAULT (NEWID()) NOT NULL
    , Name NVARCHAR (256) NULL
    , Description NVARCHAR (256) NULL
    , ConcurrencyStamp NVARCHAR (MAX) NULL
    , CreatedUserId INT NULL
    , CreatedDate DATETIME2(0) CONSTRAINT DF_Security_AspNetGroups_CreatedDate DEfAULT (SYSUTCDATETIME()) NOT NULL
    , UpdatedUserId INT NULL
    , UpdatedDate DATETIME2(0) NULL
    , CONSTRAINT PK_Security_AspNetGroups PRIMARY KEY CLUSTERED ( Id  ASC)
    , CONSTRAINT FK_Security_AspNetGroups_CreatedUserId FOREIGN KEY (CreatedUserId) REFERENCES Common.Users (Id)
    , CONSTRAINT FK_Security_AspNetGroups_UpdatedUserId FOREIGN KEY (UpdatedUserId) REFERENCES Common.Users (Id)
);
GO

CREATE UNIQUE NONCLUSTERED INDEX  RoleNameIndex  ON  Security . AspNetGroups ( Name  ASC) WHERE ( Name  IS NOT NULL)
GO

