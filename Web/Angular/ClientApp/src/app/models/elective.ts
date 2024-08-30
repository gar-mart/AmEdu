import { SemesterElective } from ".";
import { ElectiveGroupChoice } from "./elective-group-choice";

export interface Elective {
  id: number;
  name: string;
  isCommunityPassportElective: boolean;
  hasPrerequisite: boolean;
  isCommunityPassportElectiveAlternate: boolean;
  choiceGroupId: number;
  choiceGroupElectivesRequired: number;
  gradeLevelString: string;
  semesterElectives: SemesterElective[];
  semesterOne: boolean;
  semesterTwo: boolean;
  electiveGroupChoices: ElectiveGroupChoice[];
}
