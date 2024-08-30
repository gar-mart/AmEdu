CREATE TYPE Tvp.Points AS TABLE
(	 Id INT
	, UserId INT
	, StaffId INT
	, Type TINYINT 
	, Value SMALLINT
	, Date DATETIME2(0)
	, Comments NVARCHAR(500) 
	, PageSource TINYINT 
	, UserSource TINYINT 
)
