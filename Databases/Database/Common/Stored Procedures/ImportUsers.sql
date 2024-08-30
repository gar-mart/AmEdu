CREATE PROCEDURE Common.ImportUsers(
	@userList Tvp.UserList READONLY
)
AS
SET NOCOUNT ON

DECLARE @DisplayNames TABLE (Email NVARCHAR(MAX), DisplayName NVARCHAR(25))

MERGE Common.Users TRG
USING (
	SELECT u.*, ISNULL(d.DisplayName, u.FirstName) DisplayName
	FROM @userList u
	LEFT JOIN @DisplayNames d ON u.Email = d.Email
) SRC ON 
	TRG.Email = SRC.Email 
	OR TRG.GoogleId = SRC.GoogleId
WHEN MATCHED THEN UPDATE SET
	GoogleId = SRC.GoogleId
	, Email = SRC.Email
	, NormalizedEmail = UPPER(SRC.Email)
	, UserName = SRC.Email
	, NormalizedUserName = UPPER(SRC.Email)
	, FirstName = SRC.DisplayName
	, LastName = SRC.LastName
	, IsActive = 1
WHEN NOT MATCHED THEN INSERT(
	GoogleId
	, Email
	, NormalizedEmail
	, UserName
	, NormalizedUserName
	, FirstName
	, LastName
	, IsActive
)
VALUES(
	  SRC.GoogleId
	, SRC.Email
	, UPPER(SRC.Email) -- NormalizedEmail
	, SRC.Email        -- UserName
	, UPPER(SRC.Email) -- NormalizedUserName
	, SRC.DisplayName
	, SRC.LastName
	, 1
)
WHEN NOT MATCHED BY SOURCE THEN UPDATE SET IsActive = 0;

;WITH src AS (
	SELECT u.*, g.Id GroupId
	FROM Common.Users u
	INNER JOIN @userList l ON 
		u.Email = l.Email 
		OR u.GoogleId = l.GoogleId
	CROSS APPLY (
		SELECT g.Id
		FROM Security.AspNetGroups g
		WHERE g.Name = 'Staff'
	) g
	WHERE l.IsStaff = 1
), trg AS (
	SELECT * 
	FROM Security.AspNetUserGroups ug
	INNER JOIN Security.AspNetGroups g ON ug.GroupId = g.Id
	WHERE g.Name = 'Staff'
)
MERGE trg USING src ON src.IdentityId = trg.UserId
WHEN NOT MATCHED BY SOURCE THEN DELETE
WHEN NOT MATCHED THEN INSERT (
	GroupId
	, UserId
) VALUES (
	src.GroupId
	, src.IdentityId
);