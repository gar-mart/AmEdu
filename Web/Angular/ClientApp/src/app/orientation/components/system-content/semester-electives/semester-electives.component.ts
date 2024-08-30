import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { CommunityPassportForm } from "@models/community-passport-form.model";
import { Elective } from "@models/elective";
import { ElectiveGroup } from "@models/elective-group";
import { ElectiveSetting } from "@models/elective-setting.model";
import { SemesterElective } from "@models/semester-elective.model";
import { Step } from "@models/step.model";
import { StepsByStudent } from "@models/steps-by-student.model";
import { CommonService } from "@services/common.service";
import { OrientationService } from "@services/orientation.service";
import { StudentOrientationService } from "@student/student-orientation/student-orientation.service";
import { AppComponent } from "app/app.component";
import { Constants } from "app/shared";
import { Observable, forkJoin, of } from "rxjs";
import { finalize, map, switchMap, tap } from "rxjs/operators";
import { ContentComponentModel } from "../../content-component.model";

type SemesterGroup = { group: ElectiveGroup; semesterElectives: SemesterElective[] };

@Component({
  selector: "app-semester-electives",
  templateUrl: "./semester-electives.component.html",
  styleUrls: ["./semester-electives.component.scss"],
})
export class SemesterElectivesComponent extends ContentComponentModel implements OnInit, OnDestroy {
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Input() updateMode: boolean;
  @Input() step: StepsByStudent;
  @Input() masterStep: Step; // not provided in live orientation
  @Input() semester: 1 | 2;

  private _semesterElectives: SemesterElective[];

  loading = true;

  allElectives: Elective[];
  settings: ElectiveSetting[];
  groups: ElectiveGroup[];
  semesterGroups: SemesterGroup[];
  communityPassportForm: CommunityPassportForm;

  /** If preview mode, there must be a way to select a grade level */
  gradeLevelControl: UntypedFormControl;

  get gradeLevel(): string {
    return this.gradeLevelControl?.value || (this.semesterElectives && this.semesterElectives[0]?.gradeLevel);
  }
  get semesterSetting(): ElectiveSetting {
    return this.settings.find(s => s.gradeLevel === this.gradeLevel);
  }
  get requiredElectives(): number {
    return this.semester === 1
      ? this.semesterSetting.requiredElectivesPerSemester1
      : this.semesterSetting.requiredElectivesPerSemester2;
  }
  get requiredElectivesLeftToChoose(): number {
    return this.requiredElectives - this.semesterElectives.filter(s => s.isSelected).length;
  }
  get isLockedIn(): boolean {
    return this.semesterElectives?.some(s => s.isLockedIn);
  }

  get semesterElectives(): SemesterElective[] {
    return this._semesterElectives;
  }
  set semesterElectives(value: SemesterElective[]) {
    this._semesterElectives = value;
    const semesterGroups = new Map<number, SemesterGroup>();

    const noGroup: SemesterGroup = {
      group: {
        id: 0,
        semester: this.semester,
        numberOfRequiredChoices: 0,
        electiveGroupChoices: [],
      },
      semesterElectives: [],
    };
    semesterGroups.set(noGroup.group.id, noGroup);

    value.forEach(semesterElective => {
      if (semesterElective.elective.electiveGroupChoices.length) {
        // get the group definitions for this elective
        const matchedGroups = this.groups.filter(g =>
          semesterElective.elective.electiveGroupChoices.some(c => c.electiveGroupId === g.id)
        );

        if (matchedGroups.length) {
          // for all matched groups, add them to our semester groups list
          matchedGroups.forEach(group => {
            if (!semesterGroups.has(group.id)) {
              semesterGroups.set(group.id, {
                group,
                semesterElectives: [],
              });
            }
            semesterGroups.get(group.id).semesterElectives.push(semesterElective);
          });
          return;
        }
      }

      noGroup.semesterElectives.push(semesterElective);
    });

    this.semesterGroups = [...semesterGroups.values()];
  }

  get startSchoolYear(): number {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    if (month === 0 || (this.semester === 2 && month < 5) /* June */) {
      // if today's month is January, or if it is semester 2 and it is February, March, April, or May then use the last calendar year as the start of the school year
      return year - 1;
    }

    // in all other cases, "this" year is the start of the school year (which may not have started yet)
    return year;
  }

  get endSchoolYear(): number {
    return this.startSchoolYear + 1;
  }

  get gradeLevels(): string[] {
    return Constants.grades.filter(g => !this.masterStep?.gradeLevels || this.masterStep.gradeLevels.includes(g));
  }

  get canEdit(): boolean {
    return this.updateMode || !this.step?.isCompleted;
  }

  get requireCommunityPassportForm(): boolean {
    return (
      !!this.communityPassportForm?.url &&
      !!this.semesterGroups?.some(group =>
        group?.semesterElectives.some(e => e.isSelected && e.isCommunityPassportElective)
      )
    );
  }

  get communityPassportFormLinkClicked(): boolean {
    const value = sessionStorage.getItem("community-passport-form-clicked");
    return value === "true";
  }
  set communityPassportFormLinkClicked(value: boolean) {
    sessionStorage.setItem("community-passport-form-clicked", value.toString());
  }

  constructor(
    private commonService: CommonService,
    private appComponent: AppComponent,
    orientationService: OrientationService,
    studentOrientationService: StudentOrientationService
  ) {
    super(orientationService, studentOrientationService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.editMode) {
      setTimeout(() => (this.loading = false));
      return;
    } else if (this.previewMode && !this.gradeLevelControl) {
      this.gradeLevelControl = new UntypedFormControl();
      this.gradeLevelControl.setValue(this.user.gradeLevel || this.gradeLevels[0]);
      this.subscriptions.push(
        this.gradeLevelControl.valueChanges
          .pipe(
            switchMap(gradeLevel =>
              this.commonService.setStudentGradeLevel(this.commonService.user.userId, gradeLevel)
            ),
            tap(() => this.ngOnInit())
          )
          .subscribe()
      );
    }

    setTimeout(() => (this.loading = this.appComponent.isBusy = true));
    forkJoin({
      settings: this.commonService.returnElectiveSettings(),
      groups: this.commonService.returnElectiveGroups(),
      semesterElectives: this.step
        ? this.orientationService.returnElectives(this.step.userId, this.semester, this.startSchoolYear)
        : of(null as SemesterElective[]),
      electives: this.commonService.returnElectives(),
      communityPassportForm: this.orientationService.returnCommunityPassportFormByGradeLevel(this.gradeLevel),
    })
      .pipe(
        switchMap(result => {
          this.settings = result.settings;
          this.groups = result.groups.filter(g => g.semester === this.semester);
          this.allElectives = result.electives;
          this.communityPassportForm = result.communityPassportForm;

          if (this.previewMode) {
            this.setPreviewElectives();
          } else if (this.step) {
            this.semesterElectives = result.semesterElectives.map(semesterElective => {
              semesterElective.elective = this.allElectives.find(
                elective => elective.id === semesterElective.electiveId
              );
              return semesterElective;
            });
          }

          // need to get the community passport form after initial requests because the grade level is determined by the semester electives
          return this.orientationService.returnCommunityPassportFormByGradeLevel(this.gradeLevel);
        }),
        tap(communityPassportForm => (this.communityPassportForm = communityPassportForm)),
        finalize(() => (this.loading = this.appComponent.isBusy = false))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  save(): Observable<string> {
    if (this.isLockedIn) {
      return of(null); // user cannot make changes, simply continue with no action
    }

    if (this.requiredElectivesLeftToChoose === this.requiredElectives) {
      return of("Please choose your electives.");
    }

    if (this.requiredElectivesLeftToChoose > 0) {
      return of("Not enough electives have been chosen.");
    }

    if (this.semesterGroups.some(group => this.requiredElectivesLeftToChooseInGroup(group) > 0)) {
      return of("One or more groups of electives have not met choice requirements.");
    }

    const selectedElectives = this.semesterElectives.filter(s => s.isSelected);

    const anyCommunityPassport = selectedElectives.some(s => s.isCommunityPassportElective);
    const anyCommunityPassportAlternate = selectedElectives.some(s => s.isCommunityPassportElectiveAlternate);
    if (anyCommunityPassport && anyCommunityPassportAlternate) {
      return of(
        "You may choose either a Community Passport Elective or a Community Passport Alternative, but not both."
      );
    }

    if (this.requireCommunityPassportForm && !this.communityPassportFormLinkClicked) {
      return of("Please click on the community passport application link before continuing.");
    }

    return this.orientationService
      .submitUserElectivesStep({
        userId: this.step.userId,
        electiveList: selectedElectives.map(semesterElective => {
          return {
            semester: this.semester,
            electiveId: semesterElective.electiveId,
            gradeLevel: semesterElective.gradeLevel,
          };
        }),
      })
      .pipe(map(() => null));
  }

  gradeLevelTrackBy(index: number, item: string) {
    return item;
  }

  semesterGroupTrackBy(index: number, item: SemesterGroup) {
    return item.group.id;
  }

  semesterElectiveTrackBy(index: number, item: SemesterElective) {
    return item.electiveId;
  }

  requiredElectivesLeftToChooseInGroup(semesterGroup: SemesterGroup): string | number {
    if (semesterGroup.group.numberOfRequiredChoices <= 0) {
      return "any number";
    }
    return (
      semesterGroup.group.numberOfRequiredChoices - semesterGroup.semesterElectives.filter(s => s.isSelected).length
    );
  }

  private setPreviewElectives() {
    this.semesterElectives = this.allElectives
      .map(elective => {
        elective.semesterElectives.forEach(s => (s.elective = elective));
        return elective.semesterElectives;
      })
      .flat()
      .filter(
        semesterElective =>
          semesterElective.semester === this.semester && semesterElective.gradeLevel === this.gradeLevelControl.value
      )
      .map(semesterElective => {
        return {
          semester: semesterElective.semester,
          electiveId: semesterElective.elective.id,
          name: semesterElective.elective.name,
          isSelected: semesterElective.isSelected,
          isLockedIn: semesterElective.isLockedIn,
          isCommunityPassportElective: semesterElective.elective.isCommunityPassportElective,
          isCommunityPassportElectiveAlternate: semesterElective.elective.isCommunityPassportElectiveAlternate,
          hasPrerequisite: semesterElective.elective.hasPrerequisite,
          choiceGroupId: semesterElective.elective.choiceGroupId,
          choiceGroupElectivesRequired: semesterElective.elective.choiceGroupElectivesRequired,
          gradeLevel: semesterElective.gradeLevel,
          elective: semesterElective.elective,
        };
      });
  }
}
