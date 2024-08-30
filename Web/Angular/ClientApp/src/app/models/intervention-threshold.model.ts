export interface InterventionThreshold {
  id?: number;
  grade?: string;
  minimumCommunicationLogs?: number;
  minimumCourseHoursSpent?: number; // DECIMAL(5, 2)
  minimumLiveLessons?: number;
  expectedCommunicationLogs?: number;
  expectedLiveLessons?: number;
  numberOfRequirements?: number;
}
