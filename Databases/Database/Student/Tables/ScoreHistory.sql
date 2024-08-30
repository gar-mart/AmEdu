CREATE TABLE [Student].[ScoreHistory] (
    [StudentId]                   INT             NOT NULL,
    [ClassId]                     INT             NOT NULL,
    [ConnexusEnrollmentId]        BIGINT          CONSTRAINT [DF_ConnexusEnrollmentId] DEFAULT ((0)) NOT NULL,
    [LincolnLearningEnrollmentId] BIGINT          CONSTRAINT [DF_LincolnLearningEnrollmentId] DEFAULT ((0)) NOT NULL,
    [FlexPointEnrollmentId]       BIGINT          CONSTRAINT [DF_FlexPointEnrollmentId] DEFAULT ((0)) NOT NULL,
    [ScoreAchieved]               DECIMAL (10, 2) NOT NULL,
    [ScorePossible]               DECIMAL (10, 2) NOT NULL,
    [ScoreRatio]                  AS              (case when [ScorePossible]=(0) then NULL else CONVERT([decimal](10,2),([ScoreAchieved]/[ScorePossible])*(100)) end),
    [Score]                       AS              (case when [ScorePossible]=(0) then '-' else format(CONVERT([decimal](10,2),([ScoreAchieved]/[ScorePossible])*(100)),'G15')+'%' end),
    [AsOfDate]                    DATETIME2 (0)   NOT NULL,
    [TotalSecondsSpentOnline]     INT             NOT NULL,
    CONSTRAINT [PK_Student_ScoreHistory] PRIMARY KEY CLUSTERED ([ClassId] ASC, [StudentId] ASC, [AsOfDate] ASC, [ConnexusEnrollmentId] ASC, [LincolnLearningEnrollmentId] ASC, [FlexPointEnrollmentId] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_Student_ScoreHistory_StudentId]
    ON [Student].[ScoreHistory]([StudentId] ASC);
GO

