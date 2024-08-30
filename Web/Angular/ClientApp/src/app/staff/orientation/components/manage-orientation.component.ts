import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, HostListener, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Step } from "@models/step.model";
import { OrientationService } from "@services/orientation.service";
import { AppComponent } from "app/app.component";
import { StepStatus } from "app/enums/step-status.enum";
import { Constants } from "app/shared";
import { Observable, Subscription, combineLatest } from "rxjs";
import { map, shareReplay, startWith } from "rxjs/operators";

@Component({
  selector: "app-manage-orientation",
  templateUrl: "./manage-orientation.component.html",
  styleUrls: ["./manage-orientation.component.scss"],
})
export class ManageOrientationComponent implements OnInit, OnDestroy {
  readonly Constants = Constants;
  readonly StepStatus = StepStatus;

  scrolled = false;
  showToolbar = true;

  filter$: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  params$: Subscription;
  stepStatuses = Object.values(StepStatus).filter(x => isNaN(Number(x)));
  statusFormControl = new UntypedFormControl(Object.values(StepStatus).filter(x => !isNaN(Number(x))));
  gradesFormControl = new UntypedFormControl();

  steps: Step[] = [];
  filteredSteps: Step[] = [];
  selectedStep: Step;
  selectedTabIndex = 0;
  addingStep = false;
  sortingSlides = false;
  disableScrollToStep = false;
  isEditingStep = false;
  previewOrientationDateControl = new UntypedFormControl(this.today, { initialValueIsDefault: true });

  get today() {
    return new Date();
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private orientationService: OrientationService,
    private dialog: MatDialog,
    private appComponent: AppComponent
  ) {
    this.filter$ = combineLatest([
      this.statusFormControl.valueChanges.pipe(startWith(this.statusFormControl.value)),
      this.gradesFormControl.valueChanges.pipe(startWith(this.gradesFormControl.value)),
    ]).subscribe(() => this.filterSteps());
  }

  ngOnInit(): void {
    setTimeout(() => (this.appComponent.isBusy = true));
    this.orientationService
      .returnSteps()
      .subscribe(steps => {
        this.steps = steps;
        this.filterSteps();

        this.params$ = this.route.params.subscribe(params => {
          const selectedTabIndex = params["tabIndex"] ? Number(params["tabIndex"]) : this.selectedTabIndex;
          if (selectedTabIndex && !isNaN(selectedTabIndex)) {
            this.selectedTabIndex = selectedTabIndex;
          }

          this.selectedStep = this.filteredSteps.find(step => step.id.toString() === params["id"]);

          if (!this.selectedStep && this.filteredSteps[0]) {
            this.selectedStep = this.filteredSteps[0];
            history.replaceState(
              null,
              null,
              `${Constants.manageOrientationPath}/${this.filteredSteps[0].id}/${this.selectedTabIndex}`
            );
          }
          setTimeout(() => (this.disableScrollToStep = true));
        });
      })
      .add(() => (this.appComponent.isBusy = false));
  }

  ngOnDestroy(): void {
    this.params$.unsubscribe();
    this.filter$.unsubscribe();
  }

  filterSteps() {
    if (this.sortingSlides) {
      this.filteredSteps = this.steps;
      return;
    }
    this.filteredSteps = this.steps.filter(step => {
      step.status = this.getSlideStatus(step);

      return (
        (!this.statusFormControl.value?.length || this.statusFormControl.value.includes(step.status)) &&
        (!this.gradesFormControl.value?.length ||
          step.gradeLevels.some(sg => this.gradesFormControl.value.includes(sg)))
      );
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.filteredSteps, event.previousIndex, event.currentIndex);
  }

  addSlide(step?: Step) {
    this.addingStep = true;
    this.appComponent.isBusy = true;
    (step
      ? this.orientationService.duplicateStep(step.id)
      : this.orientationService.createStep({ orderBy: this.selectedStep?.orderBy ? this.selectedStep.orderBy + 1 : 0 })
    )
      .subscribe(step => {
        let insertAtIndex = null;

        for (let i = 0; i < this.steps.length; i++) {
          if (this.steps[i].orderBy >= step.orderBy) {
            this.steps[i].orderBy++;

            if (insertAtIndex === null) {
              insertAtIndex = i;
            }
          }
        }

        if (!insertAtIndex) {
          this.steps.push(step);
        } else {
          this.steps.splice(insertAtIndex, 0, step);
        }

        this.steps = [...this.steps];
        this.filterSteps();

        this.selectStep(step);
      })
      .add(() => {
        this.appComponent.isBusy = false;
        this.addingStep = false;
      });
  }

  resetSort() {
    this.sortingSlides = false;
    this.filterSteps();
    this.filteredSteps = this.filteredSteps.sort((a, b) =>
      a.orderBy < b.orderBy ? -1 : a.orderBy === b.orderBy ? 0 : 1
    );
    return;
  }

  onSortSlidesClick() {
    if (!this.sortingSlides) {
      this.sortingSlides = true;
      this.filterSteps();
      return;
    }
    this.orientationService
      .updateStepOrder(
        this.filteredSteps.map((x, ind) => {
          let clone = Object.assign({}, x);
          clone.orderBy = ind;
          return clone;
        })
      )
      .subscribe(
        result => {
          this.sortingSlides = false;
          this.filterSteps();
        },
        error => {
          console.log(error);
        }
      );
  }

  stepUpdated(event: { step: Step; deleted: boolean }) {
    if (event.deleted) {
      const newStepIndex = this.filteredSteps.findIndex(s => s === event.step) - 1;
      this.steps = this.steps.filter(step => step !== event.step);
      this.filterSteps();

      if (this.selectedStep === event.step) {
        this.selectStep(this.filteredSteps[Math.max(newStepIndex, 0)]);
      }
    } else {
      if (this.selectedStep.id === event.step.id) {
        this.selectedStep = event.step;
      }

      const index = this.steps.findIndex(s => s.id === event.step.id);
      if (index >= 0) {
        this.steps[index] = event.step;
      }
      this.filterSteps();
    }
  }

  stepTrackby(index: number, step: Step) {
    return step.id;
  }

  previewOrientation(dialog: TemplateRef<any>) {
    this.previewOrientationDateControl.reset();
    this.dialog
      .open(dialog, {
        panelClass: ["rounded-dialog-window"],
      })
      .beforeClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.appComponent.isBusy = true;
          this.orientationService
            .resetStudentOrientation()
            .subscribe(() => {
              const params = new URLSearchParams();
              params.append("studentId", this.orientationService.user.userId.toString());
              params.append("date", (this.previewOrientationDateControl.value as Date).toLocaleDateString());
              window.open(`/student/orientation?${params}`, "_blank");
            })
            .add(() => (this.appComponent.isBusy = false));
        }
      });
  }

  private getSlideStatus(step: Step) {
    return (step.expirationDate !== null && new Date(step.expirationDate) < new Date()) ||
      !step.activateDate ||
      !step.gradeLevels?.length
      ? StepStatus.Inactive
      : new Date(step.activateDate) <= new Date()
      ? StepStatus.Active
      : StepStatus.Upcoming;
  }

  private selectStep(step: Step, scrollIntoView = true) {
    this.selectedStep = step;
    this.disableScrollToStep = !scrollIntoView;
    this.selectedTabIndex = 0;
    if (this.selectedStep) {
      history.replaceState(
        null,
        null,
        `${Constants.manageOrientationPath}/${this.selectedStep.id}/${this.selectedTabIndex}`
      );
    } else {
      history.replaceState(null, null, `${Constants.manageOrientationPath}`);
    }
    setTimeout(() => (this.disableScrollToStep = true));
  }

  @HostListener("window:scroll", []) // for window scroll events
  onScroll() {
    this.scrolled = window.pageYOffset > 0;
  }
}
