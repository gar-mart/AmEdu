CREATE TYPE Tvp.SemesterElectiveList AS TABLE(
	GradeLevel NVARCHAR(10) NOT NULL
	, Semester TINYINT NOT NULL
	, ElectiveId INT NOT NULL
)
