import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Answer } from "@models/answer.model";
import { Question } from "@models/question.model";
import { QuizContent } from "@models/step-content.model";
import { StepsByStudent } from "@models/steps-by-student.model";
import { OrientationService } from "@services/orientation.service";
import { StudentOrientationService } from "@student/student-orientation/student-orientation.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ContentComponentModel } from "../content-component.model";
import { EditQuizDialogComponent } from "./edit-quiz-dialog.component";

@Component({
  selector: "app-quiz-content",
  templateUrl: "./quiz-content.component.html",
  styleUrls: ["./quiz-content.component.scss"],
})
export class QuizContentComponent extends ContentComponentModel implements OnInit {
  @Input("content") contentType: QuizContent;
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Input() updateMode: boolean;
  @Input() step: StepsByStudent;
  @Output() edit = new EventEmitter<void>();

  loading = true;
  clickedShowAnswers = false;

  get showAnswers(): boolean {
    return (this.step && this.step?.isCompleted && !this.updateMode) || this.clickedShowAnswers;
  }

  get disableCheckAnswers() {
    return (
      this.loading ||
      this.clickedShowAnswers ||
      (this.step?.isCompleted && !this.updateMode) ||
      this.contentType.questions.length !==
        this.contentType.questions.filter(q => q.answers.some(a => a.isUserAnswer)).length
    );
  }

  constructor(
    orientationService: OrientationService,
    studentOrientationService: StudentOrientationService,
    private dialog: MatDialog
  ) {
    super(orientationService, studentOrientationService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (!this.contentType.questions) {
      this.orientationService
        .returnQuizContent(this.contentType.id || 0, this.step?.userId || this.user.userId)
        .subscribe(questions => {
          this.contentType.questions = questions;
        })
        .add(() => (this.loading = false));
    } else {
      this.contentType.questions.forEach(q => q.answers.forEach(a => (a.isUserAnswer = false))); // reset answer choices
      setTimeout(() => (this.loading = false));
    }
  }

  editQuiz() {
    this.dialog
      .open(EditQuizDialogComponent, {
        panelClass: ["rounded-dialog-window"],
        width: "80vw",
        data: { questions: this.contentType.questions },
      })
      .beforeClosed()
      .subscribe((questions: Question[]) => {
        if (questions) {
          this.contentType.questions = questions;
          this.edit.emit();
        }
      });
  }

  answerSelected(question: Question, answer: Answer) {
    question.answers.forEach(a => (a.isUserAnswer = a === answer));
  }

  save(): Observable<string> {
    if (
      this.contentType.questions.length !==
      this.contentType.questions.filter(q => q.answers.some(a => a.isUserAnswer)).length
    ) {
      return of("Please answer each question.");
    }

    if (!this.clickedShowAnswers) {
      return of("Please check your answers before moving on.");
    }

    return this.orientationService
      .submitUserQuizAnswers({
        userId: this.step.userId,
        userQuestionsAndAnswers: this.contentType.questions.map(question => {
          const answer = question.answers.find(a => a.isUserAnswer);
          return {
            questionId: answer.questionId,
            answerId: answer.id,
          };
        }),
      })
      .pipe(map(() => null));
  }
}
