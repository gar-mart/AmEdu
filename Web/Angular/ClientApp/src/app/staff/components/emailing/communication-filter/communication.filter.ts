import { CommunicationList, Staff } from "../../../../models";

export interface CommunicationFilter {
  list: CommunicationList;
  mentor: Staff;
  grades: string[];
  domain: string;
}
