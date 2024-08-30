import { CommunicationListEntry } from "./communication-list-entry.model";

export interface CommunicationList {
  // from item
  id?: number;
  staffId?: number;
  name?: string;

  // from model
  entries: CommunicationListEntry[];
}
