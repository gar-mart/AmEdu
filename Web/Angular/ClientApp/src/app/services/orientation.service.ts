import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CommunityPassportForm } from "@models/community-passport-form.model";
import { IntroStep } from "@models/intro-step.model";
import { StepContent } from "@models/step-content.model";
import { Step } from "@models/step.model";
import { StudentSignatureContentModel } from "@models/student-signature-content.model";
import { UserElectiveStep } from "@models/user-elective-step.model";
import {
  ConnectionSurveyStep,
  OrientationReprt,
  Question,
  SemesterElective,
  SendUsASelfieStep,
  StepsByStudent,
  StudentStepsAndProgress,
  UserAnswers,
  UserQuizAnswer,
} from "app/models";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ApiService, Utility } from "../shared";

@Injectable({ providedIn: "root" })
export class OrientationService extends ApiService {
  constructor(http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    super(http, "orientation");
  }

  getStudentStepsAndProgress(userId: number, date: string | Date = null): Observable<StudentStepsAndProgress> {
    if (!date) {
      date = new Date().toLocaleDateString();
    }

    return this.get<StudentStepsAndProgress>(
      `returnStepsByStudent/${userId}/${Utility.getDateQueryFormat(new Date(date))}`
    );
  }

  returnSteps(): Observable<Step[]> {
    return this.get<Step[]>(`returnSteps`);
  }

  returnStepContent(stepId: number): Observable<StepContent> {
    return this.get<StepContent>(`returnStepContent/${stepId}`);
  }

  returnStudentSignatureContent(
    studentId: number,
    signatureContentId: number
  ): Observable<StudentSignatureContentModel> {
    return this.get<StudentSignatureContentModel>(`returnStudentSignatureContent/${studentId}/${signatureContentId}`);
  }

  returnQuizContent(quizContentId: number, userId: number = null): Observable<Question[]> {
    return this.get<Question[]>(`returnQuizContent/${quizContentId}/${userId || ""}`);
  }

  returnCommunityPassportForms() {
    return this.get<CommunityPassportForm[]>("returnCommunityPassportForms");
  }

  returnCommunityPassportFormByGradeLevel(gradeLevel: string) {
    return this.get<CommunityPassportForm>(`returnCommunityPassportFormByGradeLevel/${gradeLevel}`);
  }

  createStep(step: Partial<Step>): Observable<Step> {
    return this.post<Step>(`createStep`, step);
  }

  updateStep(step: Step): Observable<boolean> {
    return this.put<boolean>(`updateStep`, step);
  }

  deleteStep(step: Step): Observable<boolean> {
    return this.delete<boolean>(`deleteStep/${step.id}`);
  }

  updateStepOrder(steps: Step[]): Observable<boolean> {
    return this.put<boolean>(`updateStepOrder`, steps);
  }

  updateStudentSignatureContent(item: StudentSignatureContentModel): Observable<boolean> {
    return this.post<boolean>("updateStudentSignatureContent", item);
  }

  duplicateStep(id: number): Observable<Step> {
    return this.post<Step>(`duplicateStep/${id}`);
  }

  resetStudentOrientation(): Observable<boolean> {
    return this.post<boolean>(`resetStudentOrientation`);
  }

  /* #region Http Gets */

  getStepIntro(userId: number): Observable<IntroStep> {
    return this.get<IntroStep>(`returnStepIntro/${userId}`);
  }

  getStepConnectionSurveyData(userId: number): Observable<ConnectionSurveyStep> {
    return this.get<ConnectionSurveyStep>(`returnStepConnectionSurveyData/${userId}`);
  }

  getUserQuizAnswers(userId: number, stepId: number): Observable<UserQuizAnswer> {
    return this.get<UserQuizAnswer>(`returnUserQuizAnswers/${userId}/${stepId}`);
  }

  returnElectives(userId: number, semester: 1 | 2, schoolYear: number): Observable<SemesterElective[]> {
    return this.get<SemesterElective[]>(`returnElectives/${userId}/${semester}/${schoolYear}`);
  }

  getOrientationReportData(year: number): Observable<OrientationReprt> {
    return this.get<OrientationReprt>(`returnOrientationReportData/${year}`);
  }

  getStepSendUsASelfieData(userId: number): Observable<SendUsASelfieStep> {
    return this.get<SendUsASelfieStep>(`returnStepSendUsASelfieData/${userId}`);
  }

  /* #endregion */

  /* #region Http Posts */

  completeStep(userId: number, stepId: number, stayOnStepAfterComplete?: boolean): Observable<StepsByStudent> {
    const item = { userId: userId, stepId: stepId };
    return this.post<StepsByStudent>(`completeStep/`, item).pipe(
      map((step: StepsByStudent) => {
        if (step) {
          this.snackBar.open("Step Completed Successfully", "Close", { panelClass: "success", duration: 3500 });
        }
        return step;
      }),
      tap((step: StepsByStudent) => {
        if (step === null) {
          this.snackBar.open("Congratulations! You have finished your AmEdu Orientation", "Close", {
            panelClass: "success",
            duration: 3500,
          });
          if (stayOnStepAfterComplete !== true) {
            this.router.navigateByUrl("/student/dashboard");
          }
        }
      })
    );
  }

  skipHand2HandStep(userId: number): Observable<boolean> {
    return this.post<boolean>(`Skip_Hand2HandStep`, userId);
  }

  submitConnectionSurveyStep(item: ConnectionSurveyStep): Observable<boolean> {
    item.zipCode = item.zipCode?.toString(); // make sure this is converted to a string
    return this.post<boolean>(`Submit_ConnectionSurveyStep`, item);
  }

  startOrientation(userId: number): Observable<boolean> {
    return this.post<boolean>(`StartOrientation/${userId}`);
  }

  submitUserQuizAnswers(item: UserAnswers): Observable<boolean> {
    return this.post<boolean>(`Submit_UserAnswers`, item);
  }

  generateEmailVerificationCode(userId: number): Observable<string> {
    return this.post<string>(`Step_EmailVerification_ReturnCode/${userId}`);
  }

  submitVerificationCode(userId: number, verificationCode: string, codeIsCorrect: boolean): Observable<boolean> {
    const item = { userId: userId, verificationCode: verificationCode, codeIsCorrect: codeIsCorrect };
    return this.post<boolean>(`Step_EmailVerification_VerifyCode`, item);
  }

  submitUserElectivesStep(item: UserElectiveStep): Observable<boolean> {
    return this.post<boolean>(`Submit_UserElectivesStep`, item);
  }

  submitSendUsASelfieStep(item: SendUsASelfieStep): Observable<boolean> {
    return this.post<boolean>(`Submit_SendUsASelfieStep`, item);
  }

  /* #endregion */
}
