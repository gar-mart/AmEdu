-- Summary:
--   Helper view to easily perform SQL against all gradelevels without having to list them out
--   OrderBy column helps to sort the table in natural order
--   Cell helps identify the "school" (1: elementary, 2: middle, 3: high)
CREATE VIEW Common.vwGradeLevels
AS 
SELECT 'K' GradeLevel, 0 OrderBy, 1 Cell
UNION
SELECT '1' GradeLevel, 1 OrderBy, 1 Cell
UNION
SELECT '2' GradeLevel, 2 OrderBy, 1 Cell
UNION
SELECT '3' GradeLevel, 3 OrderBy, 1 Cell
UNION
SELECT '4' GradeLevel, 4 OrderBy, 1 Cell
UNION
SELECT '5' GradeLevel, 5 OrderBy, 1 Cell
UNION
SELECT '6' GradeLevel, 6 OrderBy, 2 Cell
UNION
SELECT '7' GradeLevel, 7 OrderBy, 2 Cell
UNION
SELECT '8' GradeLevel, 8 OrderBy, 2 Cell
UNION
SELECT '9' GradeLevel, 9 OrderBy, 3 Cell
UNION
SELECT '10' GradeLevel, 10 OrderBy, 3 Cell
UNION
SELECT '11' GradeLevel, 11 OrderBy, 3 Cell
UNION
SELECT '12' GradeLevel, 12 OrderBy, 3 Cell
