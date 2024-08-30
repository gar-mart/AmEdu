import { StudentResourceGradeLevel } from "./student-resource-grade-level.model";

export interface StudentResourceMetadata {
  id: number;
  title: string;
  category: string;
  url: string;
  showOnStudentDashboard: boolean;
  studentResourceGradeLevels: StudentResourceGradeLevel[];
  gradeLevelString: string;
  gradeLevels: string[];
}
