import { StudentResourceGradeLevel } from "./student-resource-grade-level.model";

export interface StudentResource {
  id: number;
  title: string;
  category: string;
  url: string;
  gradeLevelString: string;
  showOnStudentDashboard: boolean;
  studentResourceGradeLevels: StudentResourceGradeLevel[];
}
