
CREATE TABLE [Common].[Users] (
	[Id]                                   INT              IDENTITY (1, 1) NOT NULL
	, GoogleId                             NVARCHAR(100)    NULL
	, [Email]                              NVARCHAR (320)   NOT NULL
	, [FirstName]                          NVARCHAR (50)    NULL
	, [LastName]                           NVARCHAR (50)    NULL
	, [Name]                               AS               (case when len([FirstName])>(0) then upper(left([FirstName],(1)))+right(rtrim([FirstName]),len([FirstName])-(1)) else '' end+case when len([LastName])>(0) then (' '+upper(left([LastName],(1))))+right(rtrim([LastName]),len([LastName])-(1)) else '' end)
	, [MentorId]                           INT              NULL
	, [IsActive]                           BIT              NOT NULL
	, [GradeLevel]                         VARCHAR (10)     NULL
	, [OrientationStartTime]               DATETIME2 (0)    NULL
	, [OrientationExpiredNotificationSent] BIT              NULL
	, [OrientationFinishTime]              DATETIME2 (0)    NULL
	, [AppointmentLink]                    VARCHAR (500)    NULL
	, [ProfilePicture]                     VARCHAR (MAX)    NULL
	, [SecondaryMentorId]                  INT              NULL
	, [EnrollmentDate]                     DATE             NULL
	, [UnenrollmentDate]                   DATE             NULL
	, [ConnexusId]                         BIGINT           NULL
	, [LastConnexusSync]                   DATETIME2 (0)    NULL
	, [LincolnLearningId]                  BIGINT           NULL
	, [LastLincolnLearningSync]            DATETIME2 (0)    NULL
	, [FlexPointId]                        BIGINT           NULL
	, [LastFlexPointSync]                  DATETIME2 (0)    NULL
	, [Accomodations]                      NVARCHAR (MAX)   NULL
	, [HasAccomodations]                   AS               (CONVERT([bit],case when [Accomodations] IS NULL then (0) else (1) end))
	, [UICNumber]                          BIGINT           NULL
	, CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
	, CONSTRAINT [FK_Users_MentorId] FOREIGN KEY ([MentorId]) REFERENCES [Common].[Users] ([Id])
	, CONSTRAINT [FK_Users_SecondaryMentorId] FOREIGN KEY ([SecondaryMentorId]) REFERENCES [Common].[Users] ([Id])
	, CONSTRAINT [UQ_Users_Email] UNIQUE NONCLUSTERED ([Email] ASC)

	-- MS Identity columns    
	, IdentityId UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_Common_Users_IdentityId DEFAULT (NEWID()) CONSTRAINT UQ_Common_Users_IdentityId UNIQUE NONCLUSTERED (IdentityId)
	, UserName NVARCHAR (256) NULL -- todo: shouldn't be nullable, but we need it to be to create the column. Post-Deployment script cleans this up. We can make this NON NULL later.
	, NormalizedUserName NVARCHAR (256) NULL
	, NormalizedEmail NVARCHAR (256) NULL
	, EmailConfirmed BIT CONSTRAINT DF_Security_AspNetUsers_EmailConfirmed DEFAULT (0) NOT NULL
	, PasswordHash NVARCHAR (MAX) NULL
	, SecurityStamp NVARCHAR (MAX) NOT NULL DEFAULT (NEWID())
	, ConcurrencyStamp NVARCHAR (MAX) NOT NULL DEFAULT (NEWID())
	, PhoneNumber NVARCHAR (MAX) NULL
	, PhoneNumberConfirmed BIT CONSTRAINT DF_Security_AspNetUsers_PhoneNumberConfirmed DEFAULT (0) NOT NULL
	, TwoFactorEnabled BIT CONSTRAINT DF_Security_AspNetUsers_TwoFactorEnabled DEFAULT (0) NOT NULL
	, LockoutEnd DATETIMEOFFSET (7) NULL
	, LockoutEnabled BIT CONSTRAINT DF_Security_AspNetUsers_LockoutEnabled DEFAULT (1) NOT NULL
	, AccessFailedCount INT CONSTRAINT DF_Security_AspNetUsers_AccessFailedCount DEFAULT (0) NOT NULL
	, TenantId INT CONSTRAINT DF_Security_AspNetUsers_TenantId DEFAULT (0) NOT NULL
	, UserId As Id -- computed column included for backwards compatibility 
	, SliceId INT CONSTRAINT DF_Security_AspNetUsers_SliceId DEFAULT (0) NOT NULL
	, IsTriage BIT CONSTRAINT DF_Security_AspNetUsers_IsTriage DEFAULT (0) NOT NULL
	, CreatedUserId INT NULL -- if null, then System created
	, CreatedDate DATETIME2(0) CONSTRAINT DF_Security_AspNetUsers_CreatedDate DEFAULT (SYSUTCDATETIME()) NOT NULL
	, UpdatedUserId INT NULL
	, UpdatedDate DATETIME2(0) NULL
	, FullName AS FirstName + ' ' + LastName
);
GO

