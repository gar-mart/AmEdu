export abstract class Constants {
  static readonly loginTypeKey: string = "login-type";
  static readonly loginProvider: string = "login-provider"; // "Google"|"Microsoft"

  // base paths
  static readonly studentPath: string = "/student";
  static readonly staffPath: string = "/staff";

  // admin paths
  static readonly adminPath: string = Constants.staffPath + "/admin";
  static readonly breaksPath: string = Constants.adminPath + "/breaks";
  static readonly breaksLabel: string = "School Breaks";
  static readonly enrollmentImportPath: string = Constants.adminPath + "/enrollment-import";
  static readonly enrollmentImportLabel: string = "Student Enrollment Import";
  static readonly interventionThresholdsPath: string = Constants.adminPath + "/intervention-thresholds";
  static readonly interventionThresholdsLabel: string = "Intervention Thresholds";
  static readonly manageStaffPath: string = Constants.adminPath + "/manage-staff";
  static readonly manageStaffLabel: string = "Staff";
  static readonly manageOrientationPath: string = Constants.staffPath + "/manage-orientation";
  static readonly manageOrientationLabel: string = "Slides";
  static readonly manageStudentsPath: string = Constants.adminPath + "/manage-students";
  static readonly manageStudentsLabel: string = "Students";
  static readonly manageStudentResourcesPath: string = Constants.adminPath + "/manage-student-resources";
  static readonly manageStudentResourcesLabel: string = "Student Resources";
  static readonly appShortcutsPath: string = Constants.adminPath + "/app-shortcuts";
  static readonly appShortcutsLabel: string = "App Shortcuts";
  static readonly manageElectivesPath: string = Constants.adminPath + "/manage-electives";
  static readonly manageElectivesLabel: string = "Electives";

  // staff paths
  static readonly studentsPath: string = Constants.staffPath + "/students";
  static readonly studentsLabel: string = "Students";
  static readonly quotesPath: string = Constants.staffPath + "/quotes";
  static readonly quotesLabel: string = "Quote of the Day";
  static readonly communicationPath: string = Constants.staffPath + "/communication";
  static readonly communicationLabel: string = "Emailing";

  // mentor paths
  static readonly mentorPath: string = Constants.staffPath + "/mentor";
  static readonly studentListPath: string = Constants.mentorPath + "/student-list";
  static readonly studentListLabel: string = "Orientation Progress";

  // report paths
  static readonly reportsPath: string = Constants.staffPath + "/reports";
  static readonly engagementReportPath: string = Constants.reportsPath + "/engagement-report";
  static readonly engagmentReportLabel: string = "Engagement Report";
  static readonly enrollmentReportPath: string = Constants.reportsPath + "/attendance-report";
  static readonly enrollmentReportLabel: string = "Attendance Report";
  static readonly orientationReportPath: string = Constants.reportsPath + "/orientation-report";
  static readonly orientationReportLabel: string = "Student Orientation Report";
  static readonly studentPictureExportReportPath: string = Constants.reportsPath + "/student-picture-report";
  static readonly studentPictureExportReportLabel: string = "Student Picture Export";
  static readonly pbisDashboardPath: string = Constants.reportsPath + "/pbis-dashboard";
  static readonly pbisDashboardLabel: string = "PBIS Dashboard";

  // teacher paths
  static readonly teacherPath: string = Constants.staffPath + "/teacher";
  static readonly liveLessonsPath: string = Constants.teacherPath + "/live-lessons";
  static readonly liveLessonsLabel: string = "Live Lessons";

  // RE:Fuel Coordinator paths
  static readonly reFuelCoordinatorPath: string = Constants.staffPath + "/re-fuel";
  static readonly reFuelPath: string = Constants.reFuelCoordinatorPath;
  static readonly reFuelLabel: string = "RE:Fuel";

  // student paths
  static readonly dashboardPath: string = Constants.studentPath + "/dashboard";
  static readonly orientationPath: string = Constants.studentPath + "/orientation";

  // intervention paths
  static readonly interventionsPath: string = Constants.staffPath + "/interventions";
  static readonly interventionsStudentLabel: string = "Student";
  static readonly interventionsStudentPath: string = Constants.interventionsPath + "/student";
  static readonly interventionsReportLabel: string = "Report";
  static readonly interventionsReportPath: string = Constants.interventionsPath + "/report";
  static readonly interventionsEmailTemplatesLabel: string = "Email Templates";
  static readonly interventionsEmailTemplatesPath: string = Constants.interventionsPath + "/email-templates";

  //GradeLevelSelector arrays
  static readonly grades: string[] = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  static readonly gradesK5: string[] = ["K", "1", "2", "3", "4", "5"];
  static readonly grades68: string[] = ["6", "7", "8"];
  static readonly grades912: string[] = ["9", "10", "11", "12"];

  static readonly youtubeUrlPrefix = "https://www.youtube.com/watch?v=";
}
