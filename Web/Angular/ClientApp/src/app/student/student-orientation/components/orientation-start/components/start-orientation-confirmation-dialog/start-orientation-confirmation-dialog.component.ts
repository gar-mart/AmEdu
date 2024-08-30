import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { AuthorizationService } from "@services/authorization.service";
import { CommonService } from "@services/common.service";
import { NavigationService } from "@services/navigation.service";
import { OrientationService } from "@services/orientation.service";
import { User } from "app/models";

@Component({
  selector: "app-start-orientation-confirmation-dialog",
  templateUrl: "./start-orientation-confirmation-dialog.component.html",
  styleUrls: ["./start-orientation-confirmation-dialog.component.scss"],
})
export class StartOrientationConfirmationDialogComponent implements OnInit {
  user: User;
  form: UntypedFormGroup;
  gradeLevels: string[] = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  /** query param */
  date: string;

  constructor(
    private dialogRef: MatDialogRef<StartOrientationConfirmationDialogComponent>,
    private orientationService: OrientationService,
    private authorizationService: AuthorizationService,
    private authService: AuthService,
    private navigationService: NavigationService,
    private commonService: CommonService,
    private fb: UntypedFormBuilder,
    route: ActivatedRoute
  ) {
    this.date = route.snapshot.queryParamMap.get("date");

    this.form = this.fb.group({
      studentGradeLevel: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.authorizationService.getUserByUserName(this.authService.currentUser.email).subscribe(result => {
      this.user = result;
      if (this.user.gradeLevel) {
        this.form.patchValue({ studentGradeLevel: this.user.gradeLevel });
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  startOrientation() {
    const userId = parseInt(this.user.id.toString());
    const studentGradeLevel = this.form.get("studentGradeLevel").value;

    this.orientationService.startOrientation(userId).subscribe(result => {
      this.commonService.setStudentGradeLevel(userId, studentGradeLevel).subscribe(() => {
        this.orientationService.getStudentStepsAndProgress(this.user.id, this.date).subscribe(data => {
          this.dialogRef.close(result);
          this.navigationService.pushUpdatedStudentStepsAndProgress(data);
        });
      });
    });
  }
}
