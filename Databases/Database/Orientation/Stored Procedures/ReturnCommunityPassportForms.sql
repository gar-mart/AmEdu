CREATE PROCEDURE Orientation.ReturnCommunityPassportForms
AS
SET NOCOUNT ON

SELECT
	cpf.Cell
	, cpf.Url
FROM Orientation.vwCommunityPassportForms cpf
INNER JOIN Common.vwGradeLevels gl ON cpf.Cell = gl.Cell
ORDER BY cpf.Cell
