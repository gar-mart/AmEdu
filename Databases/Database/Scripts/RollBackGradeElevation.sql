UPDATE a
SET GradeLevel = b.GradeLevel, MentorId = b.MentorId
FROM Common.Users a
INNER JOIN [<table_name>] b ON a.Id = b.Id

