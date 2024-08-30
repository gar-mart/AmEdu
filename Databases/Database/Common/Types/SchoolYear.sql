-- Summary:
--   Alias for INT.
--   Expresses a school year based on the start date.
--   ex: 2021 = 2021-2022 school year
CREATE TYPE Common.SchoolYear
FROM 
INT NULL;
