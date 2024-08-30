import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { StepContentModel } from "@models/step-content.model";
import { NavigationService } from "@services/navigation.service";
import { OrientationService } from "@services/orientation.service";
import { StudentOrientationService } from "@student/student-orientation/student-orientation.service";
import { AppComponent } from "app/app.component";
import { StepsByStudent, StudentStepsAndProgress } from "app/models";
import { UserDtoInterface } from "app/modules/account/models/user-dto.model";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  templateUrl: "./slide.component.html",
  styleUrls: ["./slide.component.scss"],
})
export class SlideComponent implements OnInit, OnDestroy {
  private readonly updateCutoffDate: Date;

  user: UserDtoInterface; // the user executing the slide - could be a staff member or a student

  stepContent: StepContentModel;
  step: StepsByStudent;

  /** studentId query param */
  studentId: number;
  /** date query param */
  date: Date;
  id: number; // the actual studentId
  isSaving: boolean;
  updateMode = false;
  loading = true;

  get canUpdate(): boolean {
    return (
      this.step.isCompleted &&
      this.stepContent &&
      this.stepContent.content.some(c => !c.readonly) &&
      // let's staff edit completed slides even after the update cutoff date
      (this.user.isStaff ||
        // only let students edit completed slides up until the cutoff date
        (new Date(this.step.completedDate) >= this.updateCutoffDate && this.step.userId === this.user.userId))
    );
  }

  constructor(
    private orientationService: OrientationService,
    private studentOrientationService: StudentOrientationService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private snackBar: MatSnackBar,
    private appComponent: AppComponent
  ) {
    const date = this.route.snapshot.queryParamMap.get("date");
    if (date) {
      this.date = new Date(date);
    } else {
      this.date = new Date();
    }

    const studentId = this.route.snapshot.queryParamMap.get("studentId");

    if (studentId) {
      this.studentId = parseInt(studentId);
    }

    this.updateCutoffDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 14); // set to 14 days ago at the beginning of the day
  }

  ngOnInit() {
    this.init().subscribe(data => {
      if (data) {
        this.afterInit(data);
      }
    });
  }

  ngOnDestroy(): void {
    this.studentOrientationService.reset();
  }

  save() {
    if (!this.canSave()) {
      return false;
    }

    this.isSaving = true;
    this.studentOrientationService.saveComponents().subscribe(error => {
      if (error) {
        this.isSaving = false;
        this.snackBar.open(error, "Dismiss", { duration: 5000 });
      } else {
        this.completeStep();
      }
    });
  }

  // the following methods were broken up in order to more easily override methods

  init(): Observable<StudentStepsAndProgress> {
    setTimeout(() => (this.appComponent.isBusy = true));
    this.user = this.orientationService.user;

    if (!this.user.userId) {
      return of(null);
    }

    this.id = this.studentId ? this.studentId : parseInt(this.user.userId.toString());

    return this.orientationService.getStudentStepsAndProgress(this.id, this.date);
  }

  afterInit(data: StudentStepsAndProgress) {
    const stepId = parseInt(this.route.snapshot.params.stepId);
    this.step = data.studentSteps.find(step => step.id === stepId);

    this.orientationService.returnStepContent(this.step.id).subscribe(stepContent => {
      if (stepContent) {
        this.stepContent = new StepContentModel({ stepContent });
      }

      this.loading = this.appComponent.isBusy = false;
    });
  }

  /** User if the step is not completed and the user is a staff member or the slide's student, or if the slide is in update mode already */
  saveShown(): boolean {
    return (!this.step.isCompleted || this.updateMode) && (this.user.isStaff || this.step.userId === this.user.userId);
  }

  saveDisabled(): boolean {
    return this.isSaving;
  }

  canSave(): boolean {
    return !this.isSaving;
  }

  completeStep() {
    this.orientationService
      .completeStep(this.id, this.step.id, this.user.isStaff)
      .pipe(
        switchMap(() => {
          return this.orientationService.getStudentStepsAndProgress(this.id, this.date);
        })
      )
      .subscribe(stepsAndProgress => {
        this.navigationService.pushUpdatedStudentStepsAndProgress(stepsAndProgress);
        this.isSaving = false;
      });
  }
}
