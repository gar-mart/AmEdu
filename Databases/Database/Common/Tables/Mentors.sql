-- Summary: 
--   This table contains a bucket of "default" mentors.
--   If a student starts orientation and they do not have a mentor assigned yet, they will be assigned a mentor from this bucket.
--   The mentor chosen will be based on the GradeLevel and with the fewest mentee assignments.
CREATE TABLE Common.Mentors(
	GradeLevel VARCHAR(10) NOT NULL
	, UserId INT NOT NULL
	, CONSTRAINT PK_Mentors PRIMARY KEY CLUSTERED(GradeLevel, UserId)
	, CONSTRAINT FK_Mentors_Users FOREIGN KEY (UserId) REFERENCES Common.Users(Id)
)
