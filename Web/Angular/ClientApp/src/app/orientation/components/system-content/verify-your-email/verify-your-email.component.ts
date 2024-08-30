import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StepsByStudent } from "@models/steps-by-student.model";
import { OrientationService } from "@services/orientation.service";
import { StudentOrientationService } from "@student/student-orientation/student-orientation.service";
import { of } from "rxjs";
import { AppComponent } from "../../../../app.component";
import { ContentComponentModel } from "../../content-component.model";

@Component({
  selector: "app-verify-your-email",
  templateUrl: "./verify-your-email.component.html",
  styleUrls: ["./verify-your-email.component.scss"],
})
export class VerifyYourEmailComponent extends ContentComponentModel implements OnInit, OnDestroy {
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Input() step: StepsByStudent;

  readonly PREVIEW_VERIFY_CODE = "VERIFY";

  form: UntypedFormGroup;
  verificationCode: string;
  isCodeVerified: boolean;
  isGenerated: boolean;

  constructor(
    private fb: UntypedFormBuilder,
    private appComponent: AppComponent,
    private snackBar: MatSnackBar,
    orientationService: OrientationService,
    studentOrientationService: StudentOrientationService
  ) {
    super(orientationService, studentOrientationService);

    if (this.editMode) {
      return;
    }

    this.form = this.fb.group({
      verificationCode: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      ],
    });
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.editMode) {
      return;
    }

    this.form.get("verificationCode").disable();
    setTimeout(() => {
      this.isCodeVerified = this.step?.isCompleted;
      this.isGenerated = this.isCodeVerified;
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  generateVerificationCode() {
    const afterData = verificationCode => {
      this.verificationCode = verificationCode;
      this.form.get("verificationCode").enable();
    };

    this.isGenerated = true;

    if (this.step) {
      this.appComponent.isBusy = true;
      this.orientationService
        .generateEmailVerificationCode(this.step.userId)
        .subscribe(result => afterData(result))
        .add(() => (this.appComponent.isBusy = false));
    } else {
      // staff preview mode
      afterData(this.PREVIEW_VERIFY_CODE);
    }
  }

  submitVerificationCode() {
    const verificationCodeEntered = this.form.get("verificationCode").value;

    const afterData = (success: boolean) => {
      this.isCodeVerified = success;
      if (this.isCodeVerified) {
        this.snackBar.dismiss();
      } else {
        this.snackBar.open(`Verification code is invalid`, "Dismiss", { duration: 5000 });
      }
    };

    if (this.step) {
      this.appComponent.isBusy = true;
      this.orientationService
        .submitVerificationCode(this.step.userId, verificationCodeEntered, false)
        .subscribe(result => afterData(result))
        .add(() => (this.appComponent.isBusy = false));
    } else {
      afterData(verificationCodeEntered === this.PREVIEW_VERIFY_CODE);
    }
  }

  save() {
    if (this.isCodeVerified || this.user.isStaff) {
      // let staff members override the email verification
      return of(null);
    } else {
      return of("Please verify your email.");
    }
  }
}
