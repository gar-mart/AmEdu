CREATE TABLE [Orientation].[Steps] (
    [Id]              INT            NOT NULL,
    [Name]            NVARCHAR (150) NOT NULL,
    [ContentFileName] NVARCHAR (260) NOT NULL,
    [OrderBy]         SMALLINT       CONSTRAINT [DF_Steps_OrderBy] DEFAULT ((0)) NOT NULL,
    [ActivateDate]    DATETIME2 (0)  NULL,
    [ExpirationDate]  DATETIME2 (0)  NULL,
    [IsActive]        AS             (case when [ActivateDate]<=sysutcdatetime() AND ([ExpirationDate] IS NULL OR sysutcdatetime()<=[ExpirationDate]) then (1) else (0) end),
    CONSTRAINT [PK_Steps] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

