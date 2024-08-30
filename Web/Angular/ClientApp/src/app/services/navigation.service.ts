import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StepsByStudent, StudentStepsAndProgress } from "app/models";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class NavigationService implements OnDestroy {
  private readonly redirectUrlKey = "redirect-url";
  private onDestroy$ = new Subject<boolean>();
  studentSteps$: BehaviorSubject<StudentStepsAndProgress> = new BehaviorSubject<StudentStepsAndProgress>(null);
  currentStudentStepsAndProgress = this.studentSteps$.asObservable().pipe(takeUntil(this.onDestroy$));

  get redirectUrl() {
    return localStorage.getItem(this.redirectUrlKey);
  }
  set redirectUrl(redirectUrl: string) {
    if (!redirectUrl || redirectUrl === "/") {
      localStorage.removeItem(this.redirectUrlKey);
    } else {
      localStorage.setItem(this.redirectUrlKey, redirectUrl);
    }
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  navigateToStep(step: StepsByStudent) {
    this.router
      .navigateByUrl("/student/orientation", { skipLocationChange: true })
      .then(() =>
        this.router.navigate(["student/orientation/" + step.contentFileName, step.id], { relativeTo: this.route })
      );
  }

  pushUpdatedStudentStepsAndProgress(studentSteps: StudentStepsAndProgress) {
    this.studentSteps$.next(studentSteps);
  }
}
