CREATE TYPE Tvp.ElectiveSettingList AS TABLE(
	GradeLevel NVARCHAR(2) NOT NULL
	, RequiredElectivesPerSemester1 INT NOT NULL
	, RequiredElectivesPerSemester2 INT NOT NULL
)
