export interface Announcement {
  id: number;
  classId: number;
  title: string;
  body: string;
  startDate: Date;
  endDate: Date | null;
  isRead: boolean;
}
