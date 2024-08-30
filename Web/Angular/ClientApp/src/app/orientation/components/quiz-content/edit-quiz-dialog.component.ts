import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, ElementRef, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Answer } from "@models/answer.model";
import { Question } from "@models/question.model";
import { AvatarDialogComponent } from "app/design";

@Component({
  selector: "app-edit-quiz-dialog",
  templateUrl: "./edit-quiz-dialog.component.html",
  styleUrls: ["./edit-quiz-dialog.component.scss"],
})
export class EditQuizDialogComponent {
  questions: Question[];

  constructor(
    private dialogRef: MatDialogRef<AvatarDialogComponent>,
    private elementRef: ElementRef,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data: { questions: Question[] }
  ) {
    // copy the question list so that the user may cancel their edits
    this.questions = data.questions.map(q =>
      Object.assign({}, q, {
        answers: q.answers.map(a => Object.assign({}, a)),
      })
    );
  }

  addQuestion() {
    this.questions.push({
      id: this.questions.length ? Math.max(...this.questions.map(q => q.id)) + 1 : 1,
      questionText: "",
      orderBy: this.questions.length + 1,
      quizContentId: 0,
      answers: [],
    });

    setTimeout(() => {
      const answerInputs = this.elementRef.nativeElement.querySelectorAll("input.question");
      answerInputs[answerInputs.length - 1].focus();
    });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  addAnswer(question: Question, answerContainer: HTMLDivElement) {
    question.answers.push({
      id: question.answers.length ? Math.max(...question.answers.map(a => a.id)) + 1 : 1,
      questionId: question.id,
      answerText: "",
      isCorrectAnswer: !question.answers.length,
      isUserAnswer: false,
      orderBy: question.answers.length + 1,
    });

    setTimeout(() => {
      const answerInputs = answerContainer.querySelectorAll("input.answer");
      (answerInputs[answerInputs.length - 1] as HTMLInputElement).focus();
    });
  }

  removeAnswer(question: Question, index: number) {
    const removedAnswer = question.answers.splice(index, 1)[0];

    if (removedAnswer.isCorrectAnswer && question.answers.length) {
      question.answers[0].isCorrectAnswer = true;
    }
  }

  isCorrectAnswerChange(question: Question, correctAnswer: Answer) {
    question.answers.forEach(answer => (answer.isCorrectAnswer = answer === correctAnswer));
  }

  dropQuestion(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  dropAnswer(question: Question, event: CdkDragDrop<Answer[]>) {
    moveItemInArray(question.answers, event.previousIndex, event.currentIndex);
  }

  confirm() {
    if (this.questions.some(q => q.answers.length < 2)) {
      this.snackBar.open("Each question must have at least 2 answers.", "Dismiss", { duration: 3000 });
      return;
    }

    if (this.questions.some(q => !q.questionText || q.answers.some(a => !a.answerText))) {
      return;
    }

    this.dialogRef.close(this.questions);
  }

  close() {
    this.dialogRef.close();
  }
}
