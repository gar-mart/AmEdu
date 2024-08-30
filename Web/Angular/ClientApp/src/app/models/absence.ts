export interface Absence {
  userId?: number;
  id?: number;
  startDate: Date;
  endDate: Date;
  reason: string;

  // display only
  userName?: string;
}
