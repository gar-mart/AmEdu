export interface DirectoryEvent {
  // using Microsoft's property names to make the serialization simple for at least one of the providers
  isAllDay: boolean;
  isOrganizer: boolean;
  organizer: { emailAddress: { name: string } };
  start: { dateTime: Date };
  subject: string;
  webLink: string;
}
