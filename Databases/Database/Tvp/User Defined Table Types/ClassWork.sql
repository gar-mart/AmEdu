﻿CREATE TYPE Tvp.ClassWork AS TABLE
(
	ItemId NVARCHAR(500) NOT NULL
	, Title NVARCHAR(200) NOT NULL
	, Type NVARCHAR(20) NOT NULL
	, DueDate DATETIME2(0) NULL
	, DueDateGrace INT NOT NULL
	, Gradable BIT NOT NULL
)
