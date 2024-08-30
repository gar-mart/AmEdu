import { StudentOrientationResponse } from "./student-orientation-response.model";
import { StudentSemesterElective } from "./student-semester-elective.model";

export interface OrientationReprt {
  studentOrientationResponses: StudentOrientationResponse[];
  studentSemesterElectives: StudentSemesterElective[];
}
