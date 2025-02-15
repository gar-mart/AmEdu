﻿CREATE TABLE [Orientation].[Step_ConnectionSurvey] (
    [UserId]                                    INT             NOT NULL,
    [GuardianName]                              NVARCHAR (160)  NOT NULL,
    [WayToContactAsGuardian]                    TINYINT         NOT NULL,
    [GuardianEmailAddress]                      NVARCHAR (320)  NOT NULL,
    [GuardianPhoneNumber]                       NVARCHAR (14)   NOT NULL,
    [BestTimeToReachAsGuardian]                 TINYINT         NOT NULL,
    [WayToReachAsStudent]                       TINYINT         NOT NULL,
    [StudentPhoneNumber]                        NVARCHAR (14)   NULL,
    [StudentEmailAddress]                       NVARCHAR (320)  NULL,
    [SecondaryGuardianName]                     NVARCHAR (160)  NULL,
    [SecondaryGuardianEmailAddress]             NVARCHAR (320)  NULL,
    [SecondaryGuardianPhoneNumber]              NVARCHAR (320)  NULL,
    [Interests]                                 NVARCHAR (1000) NULL,
    [ExtraCurricularActivities]                 NVARCHAR (1000) NULL,
    [HomeAddress]                               NVARCHAR (100)  NOT NULL,
    [City]                                      NVARCHAR (60)   NOT NULL,
    [State]                                     NVARCHAR (40)   NOT NULL,
    [ZipCode]                                   NVARCHAR (5)   CONSTRAINT [DF_ZipCode] DEFAULT (('')) NOT NULL, 
    [NotesAboutMe]                              NVARCHAR (1000) NULL,
    [BroughtToAmEduChoices]                   SMALLINT        NOT NULL,
    [BroughtToAmEduOther]                     NVARCHAR (100)  NULL,
    [ContactAsStudentInfo]                      AS              (case when [WayToReachAsStudent]=(1) then [StudentEmailAddress] else [StudentPhoneNumber] end),
    [ContactAsGuardianInfo]                     AS              (case when [WayToContactAsGuardian]=(1) then [GuardianEmailAddress] else [GuardianPhoneNumber] end),
    [GuardianIsSubscribedToWeeklySnapshotEmail] BIT             CONSTRAINT [DF_GuardianSubscribed] DEFAULT ((1)) NOT NULL,
    [GuardianRelationship]                      NVARCHAR (50)   NOT NULL,
    [SecondaryGuardianRelationship]             NVARCHAR (50)   NULL,
    [StudentBirthday]                           DATE            NOT NULL,
    [IsConfirmed]                               BIT             CONSTRAINT [DF_Step_ConnectionSurvey_IsConfirmed] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_Step_ConnectionSurvey] PRIMARY KEY CLUSTERED ([UserId] ASC),
    CONSTRAINT [FK_Step_ConnectionSurvey_Users] FOREIGN KEY ([UserId]) REFERENCES [Common].[Users] ([Id])
);
GO

