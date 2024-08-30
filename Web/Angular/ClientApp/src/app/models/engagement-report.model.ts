import { Student } from "./student.model";

export interface EngagementReport extends Student {
  isMyStudent?: boolean;
  failingGrades?: number;
  anyTardies?: boolean;
  assignmentsCompleted?: number;
  assignmentsCompletedDateRange?: number;
  assignmentsCompletedOnTime?: number;
  assignmentsInGracePeriod?: number;
  totalAssignments?: number;
  totalAssignmentsDateRange?: number;
  numAbsences: number;
  assignmentsCompletedUpUntilEndDate?: number;
  totalAssignmentsUpUntilEndDate?: number;
  liveLessonsOffered?: number;
  assignmentsAssignedDateRange?: number;
}
