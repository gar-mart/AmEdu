CREATE TABLE [Security].[AspNetGroupRoles] (
    [GroupId] UNIQUEIDENTIFIER NOT NULL,
    [RoleId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_AspNetGroupRoles] PRIMARY KEY CLUSTERED ([GroupId] ASC, [RoleId] ASC),
    CONSTRAINT [FK_AspNetGroupRoles_AspNetRoles_GroupId] FOREIGN KEY ([GroupId]) REFERENCES [Security].[AspNetGroups] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AspNetGroupRoles_AspNetUsers_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Security].[AspNetRoles] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_AspNetGroupRoles_RoleId]
    ON [Security].[AspNetGroupRoles]([RoleId] ASC);

