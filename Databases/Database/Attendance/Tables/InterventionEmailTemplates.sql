-- This table will have default records created by FD
CREATE TABLE Attendance.InterventionEmailTemplates
(
    InterventionLevel TINYINT NOT NULL
    , EmailFrom TINYINT NOT NULL -- 0: Mentor, 1: Counselor, 2: Truancy@AmEduglobal.org
    , EmailTo TINYINT NOT NULL -- bit-wise value to indicate more than one selection (1: Mentor, 2: Counselor, 4: Guardian1, 8: Guardian2, 16: Student, 32: Secondary Mentor, 64: Interventionist)
    , EmailSubject NVARCHAR(200) NULL
    , IncludeEngagementFlagSnapshot BIT NOT NULL
    , EmailBody NVARCHAR(MAX) NULL
    , CONSTRAINT PK_InterventionEmailTemplates PRIMARY KEY (InterventionLevel)
)