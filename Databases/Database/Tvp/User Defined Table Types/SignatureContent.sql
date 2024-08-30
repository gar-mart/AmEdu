CREATE TYPE Tvp.SignatureContent AS TABLE(
	Id INT NOT NULL
	, OrderBy INT NOT NULL
	
	-- columns specific to this content type
	, Signer NVARCHAR(200) NULL
	, Disclaimer NVARCHAR(500) NULL
)
