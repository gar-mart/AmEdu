import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OrientationService } from "@services/orientation.service";
import { Answer, Question, User, UserAnswers } from "app/models";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.scss"],
})
export class QuizComponent implements OnInit {
  @Input() questionsList: Question[];
  @Input() answersList: Answer[];
  @Input() user: User;
  @Input() isStepCompleted: boolean;
  @Output() quizSubmitted = new EventEmitter<boolean>();

  hasSubmittedQuiz = false;
  isCleanSlate = true;
  isSaving = false;
  questionsAndAnswers = [];

  constructor(private orientationService: OrientationService) {}

  ngOnInit() {
    const userAnswers = this.answersList.filter(ua => ua.isUserAnswer);
    if (userAnswers.length > 0) {
      this.populateSelectedAnswers();

      if (userAnswers.length === this.questionsList.length) {
        this.hasSubmittedQuiz = true;
        this.sendQuizSubmittedStatus(this.hasSubmittedQuiz);
      }
    }
  }

  submitQuiz(form: NgForm) {
    this.hasSubmittedQuiz = true;
    this.isCleanSlate = false;
    const dataModel = this.generateModel();

    this.isSaving = true;
    this.orientationService.submitUserQuizAnswers(dataModel).subscribe(response => {
      this.isSaving = false;
      this.sendQuizSubmittedStatus(response);
    });
  }

  logAnswer(questionId: number, answerId: number, answer: string) {
    this.findQuestionAnswer(questionId, answerId, this.questionsAndAnswers);
  }

  filterAnswers(answers: Answer[], questionId: number) {
    return answers.filter(a => a.questionId === questionId);
  }

  sendQuizSubmittedStatus(status: boolean) {
    this.quizSubmitted.emit(status);
  }

  private findQuestionAnswer(questionId: number, answerId: number, array: any[]) {
    const item = array.find(i => i.questionId === questionId);
    const question = this.answersList.filter(q => q.questionId === questionId);

    // Reset IsUserAnswer flag for all answers on the question
    for (let i = 0; i < question.length; i++) {
      question[i].isUserAnswer = false;
    }

    // Update IsUserAnswer flag for newly chosen answer
    const answer = question.find(a => a.id === answerId);
    answer.isUserAnswer = true;

    if (item) item.answerId = answerId;
    else array.push({ questionId: questionId, answerId: answerId, isUserAnswer: true });
  }

  private generateModel(): UserAnswers {
    const questionsAndAnswersList = this.questionsAndAnswers
      .map(qa => ({ questionId: qa.questionId, answerId: qa.id }))
      .sort((a, b) => a.questionId - b.questionId);

    return {
      userId: parseInt(this.user.id.toString()),
      userQuestionsAndAnswers: questionsAndAnswersList,
    };
  }

  private populateSelectedAnswers() {
    const userAnswers = this.answersList.filter(a => a.isUserAnswer).sort((a, b) => a.questionId - b.questionId);
    this.questionsAndAnswers = userAnswers
      .map(qa => ({ questionId: qa.questionId, answerId: qa.id, isUserAnswer: qa.isUserAnswer }))
      .sort((a, b) => a.questionId - b.questionId);
    this.isCleanSlate = false;
  }
}
