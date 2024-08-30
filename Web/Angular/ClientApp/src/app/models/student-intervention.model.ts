import { InterventionStatus } from "app/enums/intervention-status.enum";

export type StudentIntervention = {
  studentId: number;
  student: string;
  gradeLevel: number;
  mentor: string;
  level1?: InterventionStatus;
  level2?: InterventionStatus;
  level3?: InterventionStatus;
  level4?: InterventionStatus;
  level1EmailExists?: boolean;
  level2EmailExists?: boolean;
  level3EmailExists?: boolean;
  level4EmailExists?: boolean;
};
