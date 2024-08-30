-- Summary:
--   We are using the Links table to store community pasport form links
--   We currently only store one per cell (K, 6, and 9)
CREATE VIEW Orientation.vwCommunityPassportForms
AS 
SELECT 
	gl.Cell
	, l.Url
FROM Orientation.Links l
INNER JOIN Common.vwGradeLevels gl ON l.GradeLevel = gl.GradeLevel
WHERE l.IsCommunityPassportForm = 1
