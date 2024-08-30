import { Answer } from "./Answer.model";
import { Question } from "./Question.model";

export interface UserQuizAnswer {
  questions: Question[];
  answers: Answer[];
}
