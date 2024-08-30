import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { CommonService } from "@services/common.service";
import { OrientationService } from "@services/orientation.service";
import { StudentOrientationService } from "@student/student-orientation/student-orientation.service";
import { BroughtToAmEduChoices } from "app/enums/brought-to-AmEdu-choices.enum";
import { PreferredContactMethod } from "app/enums/preferred-contact-method.enum";
import { PreferredContactTime } from "app/enums/preferred-contact-time.enum";
import { ConnectionSurveyStep, StepsByStudent } from "app/models";
import { forkJoin, of } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { AppComponent } from "../../../../app.component";
import { ContentComponentModel } from "../../content-component.model";

@Component({
  selector: "app-connection-survey",
  templateUrl: "./connection-survey.component.html",
  styleUrls: ["./connection-survey.component.scss"],
})
export class ConnectionSurveyComponent extends ContentComponentModel implements OnInit, OnDestroy {
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Input() set updateMode(value: boolean) {
    this._updateMode = value;

    if (value && this.connectionSurveyForm) {
      this.connectionSurveyForm.enable();
    }
  }
  @Input() step: StepsByStudent;

  private _updateMode = false;

  readonly BroughtToAmEduChoices = BroughtToAmEduChoices;
  readonly PreferredContactMethod = PreferredContactMethod;
  readonly PreferredContactTime = PreferredContactTime;

  connectionSurveyForm: UntypedFormGroup;
  isOtherChoice = false;
  loading = true;
  gradeLevel: string;
  startBirthdayPickerAt = new Date(new Date().getFullYear() - 10, 0, 1); // January 1, 10 years ago

  get isElementary(): boolean {
    return !(parseInt(this.gradeLevel) >= 6);
  }
  get primaryPersonTitle(): string {
    return this.isElementary ? "primary learning coach" : "primary person of contact";
  }
  get updateMode(): boolean {
    return this._updateMode;
  }

  constructor(
    private formBuilder: UntypedFormBuilder,
    private commonService: CommonService,
    private appComponent: AppComponent,
    orientationService: OrientationService,
    studentOrientationService: StudentOrientationService
  ) {
    super(orientationService, studentOrientationService);
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.editMode) {
      return;
    }

    setTimeout(() => (this.appComponent.isBusy = true));

    forkJoin({
      student: this.commonService.getStudentById(this.step?.userId ?? this.orientationService.user.userId),
      connectionSurvey: this.orientationService.getStepConnectionSurveyData(
        this.step?.userId ?? this.orientationService.user.userId
      ),
    })
      .pipe(
        finalize(() => {
          this.appComponent.isBusy = false;
          this.loading = false;
        })
      )
      .subscribe(({ student, connectionSurvey }) => {
        this.gradeLevel = student.gradeLevel;
        if (!connectionSurvey) {
          connectionSurvey = {
            guardianIsSubscribedToWeeklySnapshotEmail: true,
            isConfirmed: true,
          };
        }
        this.initForm(connectionSurvey);
      });
  }

  initForm(data: ConnectionSurveyStep) {
    this.connectionSurveyForm = this.formBuilder.group({
      userId: [this.step?.userId, Validators.required],
      guardianName: [data.guardianName, [Validators.required, Validators.maxLength(160)]],
      guardianEmailAddress: [
        data.guardianEmailAddress,
        [Validators.required, Validators.maxLength(320), Validators.email],
      ],
      guardianPhoneNumber: [
        data.guardianPhoneNumber,
        [Validators.required, Validators.maxLength(14), Validators.minLength(14)],
      ], // (xxx) xxx-xxxx
      secondaryGuardianName: [data.secondaryGuardianName, [Validators.maxLength(160)]],
      secondaryGuardianEmailAddress: [
        data.secondaryGuardianEmailAddress,
        [Validators.maxLength(320), Validators.email],
      ],
      secondaryGuardianPhoneNumber: [
        data.secondaryGuardianPhoneNumber,
        [Validators.maxLength(14), Validators.minLength(14)],
      ],
      homeAddress: [data.homeAddress, [Validators.required, Validators.maxLength(100)]],
      city: [data.city, [Validators.required, Validators.maxLength(60)]],
      state: [data.state, [Validators.required, Validators.maxLength(40)]],
      zipCode: [data.zipCode, [Validators.required, Validators.pattern(/^\d{5}$/)]],
      notesAboutMe: [data.notesAboutMe, [Validators.maxLength(1000)]],
      broughtToAmEduOther: [data.broughtToAmEduOther, [Validators.maxLength(100)]],
      broughtToAmEduChoices: [data.broughtToAmEduChoices, [Validators.required, Validators.min(1)]], // this is a bit-wise created value. 1 = Medical Reasons, 2 = Ability to work ahead/above grade level, 4 = Dual Enrollment, 8 = Plan to travel while doing school, 16 = Flexible Schedule, 32 = Preference for Online Learning, 64 = Small School Experience, 128 = Other
      wayToContactAsGuardian: [data.wayToContactAsGuardian || 1, [Validators.required]],
      bestTimeToReachAsGuardian: [data.bestTimeToReachAsGuardian || 1, [Validators.required]],
      guardianIsSubscribedToWeeklySnapshotEmail: [
        data.guardianIsSubscribedToWeeklySnapshotEmail,
        [Validators.required],
      ],
      guardianRelationship: [data.guardianRelationship, [Validators.required, Validators.maxLength(50)]],
      secondaryGuardianRelationship: [data.secondaryGuardianRelationship, [Validators.maxLength(50)]],
      studentBirthday: [data.studentBirthday, [Validators.required]],
      isConfirmed: [data.isConfirmed],
    });

    if (data.broughtToAmEduOther) {
      this.isOtherChoice = true;
      this.connectionSurveyForm
        .get("broughtToAmEduOther")
        .setValidators([Validators.required, Validators.maxLength(100)]);
    }

    if (this.isElementary) {
      this.connectionSurveyForm.addControl(
        "interests",
        new UntypedFormControl(data.interests, [Validators.required, Validators.maxLength(1000)])
      );
      this.connectionSurveyForm.addControl(
        "extraCurricularActivities",
        new UntypedFormControl(data.extraCurricularActivities, [Validators.required, Validators.maxLength(1000)])
      );
    } else {
      this.connectionSurveyForm.addControl(
        "studentPhoneNumber",
        new UntypedFormControl(data.studentPhoneNumber, [Validators.maxLength(14), Validators.minLength(14)])
      );
      this.connectionSurveyForm.addControl(
        "studentEmailAddress",
        new UntypedFormControl(data.studentEmailAddress, [
          Validators.required,
          Validators.maxLength(320),
          Validators.email,
        ])
      );
      this.connectionSurveyForm.addControl(
        "wayToReachAsStudent",
        new UntypedFormControl(data.wayToReachAsStudent || 1, [Validators.required])
      );
    }

    if (this.step?.isCompleted && !this.updateMode) {
      this.connectionSurveyForm.disable();
    }

    this.startBirthdayPickerAt = data.studentBirthday || this.startBirthdayPickerAt;
  }

  save() {
    this.connectionSurveyForm?.markAllAsTouched(); // "touch" all fields to show validation errors

    if (!(this.connectionSurveyForm?.valid ?? false)) {
      return of("Please complete your Connection Survey before continuing.");
    }

    const data: ConnectionSurveyStep = Object.assign({}, this.connectionSurveyForm.value);
    data.broughtToAmEduOther = this.isOtherChoice ? data.broughtToAmEduOther : null;
    return this.orientationService.submitConnectionSurveyStep(data).pipe(map(() => null));
  }

  toggleChoice(value: number, isOtherChoice: boolean) {
    const choices = this.connectionSurveyForm.get("broughtToAmEduChoices");
    choices.patchValue(choices.value === value ? null : choices.value ^ value);
    choices.markAsDirty();

    if (isOtherChoice) {
      this.isOtherChoice = !this.isOtherChoice;
      if (this.isOtherChoice) {
        this.connectionSurveyForm
          .get("broughtToAmEduOther")
          .setValidators([Validators.required, Validators.maxLength(100)]);
      } else {
        this.connectionSurveyForm.get("broughtToAmEduOther").setValidators([Validators.maxLength(100)]);
      }
    }
  }

  isChoiceSelected(value: number) {
    return (this.connectionSurveyForm.get("broughtToAmEduChoices").value & value) === value;
  }
}
