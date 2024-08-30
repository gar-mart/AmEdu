import { ElectiveGroupChoice } from "./elective-group-choice";

export interface ElectiveGroup {
  id: number;
  semester: number;
  numberOfRequiredChoices: number;
  electiveGroupChoices: ElectiveGroupChoice[];
}
