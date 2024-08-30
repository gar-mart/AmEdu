import { QuestionAnswer } from "./question-answer.model";

export interface UserAnswers {
  userId: number;
  userQuestionsAndAnswers: QuestionAnswer[];
}
