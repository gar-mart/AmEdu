export interface Enrollment {
  firstName?: string;
  lastName?: string;
  enrollmentDate?: Date;
  unenrollmentDate?: Date;
  id?: number;
  email?: string;
  currentEnrollmentDate?: Date;
  currentUnenrollmentDate?: Date;
  currentUICNumber?: number;
  hasMultipleMatches?: boolean;
  uicNumber?: number;
}
