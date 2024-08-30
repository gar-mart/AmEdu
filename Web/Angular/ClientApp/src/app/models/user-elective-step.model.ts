import { UserElective } from "./user-elective.model";

export interface UserElectiveStep {
  userId: number;
  electiveList: UserElective[];
}
