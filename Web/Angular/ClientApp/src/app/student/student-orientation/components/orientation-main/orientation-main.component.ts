import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatSidenav, MatSidenavContainer } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { AuthorizationService } from "@services/authorization.service";
import { CommonService } from "@services/common.service";
import { NavigationService } from "@services/navigation.service";
import { OrientationService } from "@services/orientation.service";
import { StepsByStudent, Student, User } from "app/models";
import { Utility } from "app/shared";
import { environment } from "environments/environment";
import { Subject } from "rxjs";
import { MentorBottomSheetComponent } from "./mentor-bottom-sheet/mentor-bottom-sheet";

@Component({
  selector: "app-orientation-main",
  templateUrl: "./orientation-main.component.html",
  styleUrls: ["./orientation-main.component.scss"],
})
export class OrientationMainComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  private _componentDestroyed$: Subject<boolean> = new Subject();

  readonly chatUrl = environment.chatUrl;

  hasStartedOrientation = true;
  progress = 0;
  studentSteps: StepsByStudent[];
  totalSteps: number;
  completedSteps: number;
  user: User;
  student: Student;
  /** studentId query param */
  studentId: number;
  /** date query param */
  date: string;
  currentStep: StepsByStudent;

  constructor(
    private authService: AuthService,
    private authorizationService: AuthorizationService,
    private orientationService: OrientationService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private router: Router,
    private bottomSheet: MatBottomSheet
  ) {
    Utility.orientationModuleIsLoaded = true;

    this.date = this.route.snapshot.queryParamMap.get("date");

    const studentId = this.route.snapshot.queryParamMap.get("studentId");

    if (studentId) {
      this.studentId = parseInt(studentId);
    }
  }

  ngOnInit() {
    if (!this.user) {
      this.getUserData();
    }

    this.authorizationService.getUserByUserName(this.authService.currentUser.email).subscribe(user => {
      this.user = user;
      const id = this.studentId ? this.studentId : parseInt(this.user.id.toString());

      this.navigationService.currentStudentStepsAndProgress.subscribe(result => {
        if (result !== null) {
          this.studentSteps = result.studentSteps;
          this.completedSteps = result.studentProgress.completedSteps;
          this.totalSteps = result.studentProgress.totalSteps;

          if (result.studentProgress.completedSteps > 0) {
            this.progress = (result.studentProgress.completedSteps / result.studentProgress.totalSteps) * 100;
          }

          const currentStep = this.studentSteps.find(step => step.isCurrent);
          if (currentStep) {
            this.router.navigateByUrl("student/orientation", { skipLocationChange: true }).then(() =>
              this.router.navigate(["student/orientation/" + currentStep.contentFileName, currentStep.id], {
                queryParams: this.date ? { studentId: this.studentId, date: this.date } : { studentId: this.studentId },
              })
            );
          }

          this.commonService.getStudentById(id).subscribe(result => {
            this.student = result;
            this.hasStartedOrientation = this.student && this.student.orientationStartTime ? true : false;
          });
        } else {
          this.orientationService.getStudentStepsAndProgress(id, this.date).subscribe(data => {
            this.navigationService.pushUpdatedStudentStepsAndProgress(data);
          });
        }
      });
    });
  }

  ngOnDestroy() {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }

  getUserData() {
    this.authorizationService.getUserByUserName(this.authService.currentUser.email).subscribe(user => {
      this.user = user;
      const id = this.studentId ? this.studentId : this.user.id;
      this.orientationService.getStudentStepsAndProgress(id, this.date).subscribe(data => {
        this.studentSteps = data.studentSteps;
        this.completedSteps = data.studentProgress.completedSteps;
        this.totalSteps = data.studentProgress.totalSteps;

        if (data.studentProgress.completedSteps > 0) {
          this.progress = (data.studentProgress.completedSteps / data.studentProgress.totalSteps) * 100;
        }
      });
    });
  }

  navigate(step: StepsByStudent) {
    this.router.navigateByUrl("student/orientation", { skipLocationChange: true }).then(() =>
      this.router.navigate(["student/orientation/" + step.contentFileName, step.id], {
        queryParams: this.date ? { studentId: this.studentId, date: this.date } : { studentId: this.studentId },
      })
    );
  }

  getUpdatedOrientationStatus(status: boolean) {
    this.hasStartedOrientation = status;
  }

  openBottomSheet() {
    this.bottomSheet.open(MentorBottomSheetComponent, { data: this.student });
  }

  // when a new step is activated, we force the step to scroll to the top
  onActivate() {
    if (this.sidenavContainer && this.sidenavContainer.scrollable) {
      this.sidenavContainer.scrollable.scrollTo({ top: 0 });
    }
  }
}
