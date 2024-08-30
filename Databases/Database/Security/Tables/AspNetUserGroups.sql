CREATE TABLE [Security].[AspNetUserGroups] (
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [GroupId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_AspNetUserGroups] PRIMARY KEY CLUSTERED ([UserId] ASC, [GroupId] ASC),
    CONSTRAINT [FK_AspNetUserGroups_AspNetRoles_GroupId] FOREIGN KEY ([GroupId]) REFERENCES [Security].[AspNetGroups] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AspNetUserGroups_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES Common.Users (IdentityId) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_AspNetUserGroups_GroupId]
    ON [Security].[AspNetUserGroups]([GroupId] ASC);

