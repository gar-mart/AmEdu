CREATE PROCEDURE Orientation.UpdateElectiveSettings
	@electiveSettings Tvp.ElectiveSettingList READONLY
AS
SET NOCOUNT ON

MERGE Orientation.ElectiveSettings USING @electiveSettings SettingList
	ON ElectiveSettings.GradeLevel = SettingList.GradeLevel
WHEN MATCHED THEN UPDATE SET
	RequiredElectivesPerSemester1 = SettingList.RequiredElectivesPerSemester1
	, RequiredElectivesPerSemester2 = SettingList.RequiredElectivesPerSemester2;