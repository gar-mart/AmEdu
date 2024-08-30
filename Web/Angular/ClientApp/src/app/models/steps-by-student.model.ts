export interface StepsByStudent {
  id: number;
  name: string;
  contentFileName: string;
  isCompleted: boolean;
  isCurrent: boolean;
  userId: number;
  completedDate: Date;

  // used on client
  editMode: boolean;
}
