CREATE TABLE [Attendance].[ClassUsers] (
    [ClassId]                 INT             NOT NULL,
    [UserId]                  INT             NOT NULL,
    [ConnexusId]              BIGINT          CONSTRAINT [DF_ConnexusId] DEFAULT ((0)) NOT NULL,
    [LincolnLearningId]       BIGINT          CONSTRAINT [DF_LincolnLearningId] DEFAULT ((0)) NOT NULL,
    [FlexPointId]             BIGINT          CONSTRAINT [DF_FlexPointId] DEFAULT ((0)) NOT NULL,
    [TotalSecondsSpentOnline] INT             CONSTRAINT [DF_TotalSecondsSpentOnline] DEFAULT ((0)) NOT NULL,
    [ScoreAchieved]           DECIMAL (10, 2) CONSTRAINT [DF_ScoreAchieved] DEFAULT ((0)) NOT NULL,
    [ScorePossible]           DECIMAL (10, 2) CONSTRAINT [DF_ScorePossible] DEFAULT ((0)) NOT NULL,
    [Score]                   AS              (case when [ScorePossible]=(0) then '-' else format(CONVERT([decimal](10,2),([ScoreAchieved]/[ScorePossible])*(100)),'G15')+'%' end),
    [ScoreRatio]              AS              (case when [ScorePossible]=(0) then NULL else CONVERT([decimal](10,2),([ScoreAchieved]/[ScorePossible])*(100)) end),
    [MarkedForDelete]         BIT             CONSTRAINT [DF_ClassUsers_MarkedForDelete] DEFAULT ((0)) NOT NULL,
    [IsDeleted]               BIT             CONSTRAINT [DF_ClassUsers_IsDeleted] DEFAULT ((0)) NOT NULL,
    [StartDate]               DATETIME2 (0)   NULL,
    [EndDate]                 DATETIME2 (0)   NULL,
    [AsOfDate]                DATETIME2 (0)   CONSTRAINT [DF_ClassUsers_AsOfDate] DEFAULT (sysutcdatetime()) NOT NULL,
    [Status]                  TINYINT         CONSTRAINT [DF_ClassUsers_Status] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_ClassUsers] PRIMARY KEY CLUSTERED ([ClassId] ASC, [UserId] ASC, [ConnexusId] ASC, [LincolnLearningId] ASC, [FlexPointId] ASC),
    CONSTRAINT [FK_ClassUsers_ClassId] FOREIGN KEY ([ClassId]) REFERENCES [Attendance].[Classes] ([Id]),
    CONSTRAINT [FK_ClassUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [Common].[Users] ([Id])
);
GO

CREATE NONCLUSTERED INDEX [IX_Attendance_ClassUsers_Deleted]
    ON [Attendance].[ClassUsers]([ClassId] ASC, [UserId] ASC)
    INCLUDE([IsDeleted], [StartDate], [EndDate], [ScoreAchieved], [ScorePossible]) WHERE ([IsDeleted]=(0));
GO

CREATE NONCLUSTERED INDEX [IX_Attendance_ClassUsers_IsDeleted]
    ON [Attendance].[ClassUsers]([IsDeleted] ASC)
    INCLUDE([StartDate], [EndDate]);
GO

CREATE NONCLUSTERED INDEX [IX_Attendance_ClassUsers_UserId]
    ON [Attendance].[ClassUsers]([UserId] ASC, [EndDate] ASC, [StartDate] ASC)
    INCLUDE([IsDeleted])
GO

