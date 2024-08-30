-- App Tile Metadata
INSERT INTO Student.AppTileMetadata (
	Title
	, Image
	, Url
	, DefaultOrderBy
) VALUES (
	'Courses'
	, 'assets/PearsonConnexus.PNG'
	, 'https://AmEdu.lms.pearsonconnexus.com/'
	, 1
)

INSERT INTO Student.AppTileMetadata (
	Title
	, Image
	, Url
	, DefaultOrderBy
) VALUES (
	'Student Tools'
	, 'assets/StudentTools.PNG'
	, 'https://www.office.com/'
	, 2
)

INSERT INTO Student.AppTileMetadata (
	Title
	, Image
	, Url
	, DefaultOrderBy
) VALUES (
	'Live School'
	, 'assets/LiveSchool.PNG'
	, 'https://student.liveschoolinc.com/#/login'
	, 3
)

INSERT INTO Student.AppTileMetadata (
	Title
	, Image
	, Url
	, DefaultOrderBy
) VALUES (
	'Xello'
	, 'assets/Xello.PNG'
	, 'https://login.xello.world/'
	, 4
)

INSERT INTO Student.AppTileMetadata (
	Title
	, Image
	, Url
	, DefaultOrderBy
) VALUES (
	'Xodo PDF'
	, 'assets/XodoPDF.PNG'
	, 'https://www.xodo.com/app/#/'
	, 5
)

INSERT INTO Student.AppTileMetadata (
	Title
	, Image
	, Url
	, DefaultOrderBy
) VALUES (
	'Tech Support'
	, 'assets/TechSupport.PNG'
	, 'https://vectortechgroup.com/support/'
	, 6
)

-- Intervention Thresholds
INSERT INTO Attendance.InterventionThresholds (Grade) VALUES ('K'), ('1'), ('2'), ('3'), ('4'), ('5'), ('6'), ('7'), ('8'), ('9'), ('10'), ('11'), ('12')

-- Acceptable Use Policy
INSERT INTO Orientation.Questions (Id, StepId, OrderBy, QuestionText) VALUES 
	(20, 4, 1, 'If you unenroll from AmEdu, how many days do you have to return your device?')
	, (21, 4, 2, 'Are students able to download games and other applications on their device?')
	, (22, 4, 3, 'Who is responsible for monitoring the students'' use of their device?​')

INSERT INTO Orientation.QuestionAnswers (Id, QuestionId, OrderBy, IsCorrectAnswer, AnswerText) VALUES
	(54, 20, 1, 0, '3')
	, (55, 20, 2, 0, '5')
	, (56, 20, 3, 1, '10')
	, (57, 20, 4, 0, '15')
	
	, (58, 21, 1, 0, 'yes')
	, (59, 21, 2, 1, 'no')
	, (60, 21, 3, 0, 'only if they ask their mentor')
	
	, (61, 22, 1, 1, 'The parents/guardians')
	, (62, 22, 2, 0, 'Mentors')
	, (63, 22, 3, 0, 'Teachers')
	, (64, 22, 3, 0, 'The Student')

