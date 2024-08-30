import { Answer } from "./answer.model";

export interface Question {
  id: number;
  questionText: string;
  orderBy: number;
  quizContentId: number;

  answers: Answer[];
}
