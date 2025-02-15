﻿-- Auto-Generated Identity Table
CREATE TABLE [Security].[AspNetUserTokens] (
    [UserId]        UNIQUEIDENTIFIER NOT NULL,
    [LoginProvider] NVARCHAR (128) NOT NULL,
    [Name]          NVARCHAR (128) NOT NULL,
    [Value]         NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED ([UserId] ASC, [LoginProvider] ASC, [Name] ASC),
    CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES Common.Users (IdentityId) ON DELETE CASCADE
);

