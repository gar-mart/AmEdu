export interface Answer {
  id: number;
  questionId: number;
  answerText: string;
  isCorrectAnswer: boolean;
  isUserAnswer: boolean;
  orderBy: number;
}
