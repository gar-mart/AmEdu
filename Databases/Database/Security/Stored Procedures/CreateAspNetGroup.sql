CREATE PROCEDURE Security.CreateAspNetGroup(
    @currentUserId INT
    , @currentUserTimeZoneId SYSNAME
    , @name VARCHAR(256)
    , @description VARCHAR(256)
    , @newId UNIQUEIDENTIFIER OUTPUT
)
AS 
SET NOCOUNT ON

INSERT INTO Security.AspNetGroups (
    Name
    , Description
    , CreatedUserId
)
VALUES (
    @name
    , @description
    , @currentUserId
)

SET @newId = (SELECT TOP 1 Id FROM Security.AspNetGroups WHERE Name = @name)