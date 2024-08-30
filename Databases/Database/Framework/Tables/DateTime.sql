CREATE TABLE Framework.DateTime
(
    -- + This columns is the primary key
	-- + This column must be set to 1
	-- + Therefore, this table can only have one record
    Singular BIT NOT NULL CONSTRAINT Singular_Framework_DateTimeExample
		PRIMARY KEY CHECK(Singular = 1)
		DEFAULT(1) -- helper constraint so we do not need to provide 1 on creation		
	, Date DATE NULL
	, Time TIME(3) NULL
	, DateTime DATETIME2(3) NULL 
)
