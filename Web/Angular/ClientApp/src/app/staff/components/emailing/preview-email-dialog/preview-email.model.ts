import { CommunicationListEntry } from "../../../../models";

export interface PreviewEmailModel {
  fromEmailAddress: string;
  subject: string;
  body: string;
  attachments?: File[];
  optionalRecipients?: CommunicationListEntry[];
  additionalRecipients?: string[];
  bccAllRecipients?: boolean;
  allowPersonalization?: boolean;
}
