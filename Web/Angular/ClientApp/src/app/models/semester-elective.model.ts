import { Elective } from "./elective";

export interface SemesterElective {
  semester: number;
  electiveId: number;
  name: string;
  isSelected: boolean;
  isLockedIn: boolean;
  isCommunityPassportElective: boolean;
  isCommunityPassportElectiveAlternate: boolean;
  hasPrerequisite: boolean;
  choiceGroupId: number | null;
  choiceGroupElectivesRequired: number | null;
  gradeLevel: string;

  /** Master elective definition */
  elective?: Elective;
}
