CREATE TABLE [Student].[ReFuelReservations] (
    [StudentId]           INT            NOT NULL,
    [Date]                DATE           NOT NULL,
    [RejectReasonType]    TINYINT        NULL,
    [RejectReasonComment] NVARCHAR (500) NULL,
    [StandbyPosition]     INT            NULL,
    [Type]                TINYINT        CONSTRAINT [DF_Student_ReFuelReservations_Type] DEFAULT ((3)) NOT NULL,
    [CreatedUserId]       INT            NOT NULL,
    [CreatedDate]         DATETIME2 (0)  CONSTRAINT [DF_Student_ReFuelReservations] DEFAULT (sysutcdatetime()) NOT NULL,
    [UpdatedUserId]       INT            NULL,
    [UpdatedDate]         DATETIME2 (0)  NULL,
    -- inquiry responses to Staff.ReFuelInquires
    [GeneralInquiryResponse] NVARCHAR(250) NULL,
    [BreakfastInquiryResponse] NVARCHAR(250) NULL,
    [LunchInquiryResponse] NVARCHAR(250) NULL,
    CONSTRAINT [PK_Student_ReFuelReservations] PRIMARY KEY CLUSTERED ([StudentId] ASC, [Date] ASC),
    CONSTRAINT [CK_RejectReason_Other_Comment_Required] CHECK ([RejectReasonType]<>(3) OR [RejectReasonComment] IS NOT NULL),
    CONSTRAINT [CK_Student_ReFuelReservations_Date] CHECK (datepart(weekday,[Date])=(5) OR datepart(weekday,[Date])=(3)),
    CONSTRAINT [FK_Student_ReFuelReservations_CreatedUserId] FOREIGN KEY ([CreatedUserId]) REFERENCES [Common].[Users] ([Id]),
    CONSTRAINT [FK_Student_ReFuelReservations_StudentId] FOREIGN KEY ([StudentId]) REFERENCES [Common].[Users] ([Id]),
    CONSTRAINT [FK_Student_ReFuelReservations_UpdatedUserId] FOREIGN KEY ([UpdatedUserId]) REFERENCES [Common].[Users] ([Id])
);
GO

