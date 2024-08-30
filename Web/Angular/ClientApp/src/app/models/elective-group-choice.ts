import { SemesterElective } from ".";

export interface ElectiveGroupChoice {
  id?: number;
  electiveId: number;
  name?: string;
  electiveGroupId: number;
  semesterElectives?: SemesterElective[];
  gradeLevelString?: string;
}
