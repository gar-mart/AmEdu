import { Component, Inject, OnDestroy } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "@design/confirmation-dialog/confirmation-dialog.component";
import { Elective } from "@models/elective";
import { SemesterElective } from "@models/semester-elective.model";
import { AdminService } from "@services/admin.service";
import { Subscription } from "rxjs";

interface CommunityPassportOption {
  value: number;
  viewValue: string;
}

@Component({
  selector: "app-elective-dialog",
  templateUrl: "./elective-dialog.component.html",
  styleUrls: ["./elective-dialog.component.scss"],
})
export class ElectiveDialogComponent implements OnDestroy {
  isNew: boolean = false;
  form: UntypedFormGroup;
  elective: Elective;
  selectedGradeLevels: string[] = [];
  saving: boolean;
  communityPassports: CommunityPassportOption[] = [
    { value: 0, viewValue: "N/A" },
    { value: 1, viewValue: "Community Passport" },
    { value: 2, viewValue: "Community Passport Alternate" },
  ];
  semesterOne: boolean = false;
  semesterTwo: boolean = false;
  communityPassportValue = 0;
  subscriptions: Subscription[] = [];

  temporarySemesters = [];
  temporaryGradeLevels = [];

  constructor(
    private adminService: AdminService,
    formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ElectiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Elective
  ) {
    this.elective = data;

    if (this.elective !== null) {
      this.elective.semesterElectives.forEach(gradeLevel => {
        this.selectedGradeLevels.push(gradeLevel.gradeLevel);

        this.semesterOne ||= gradeLevel.semester === 1;
        this.semesterTwo ||= gradeLevel.semester === 2;
      });

      //communityPassport value
      if (this.elective.isCommunityPassportElectiveAlternate) {
        this.communityPassportValue = 2;
      } else if (this.elective.isCommunityPassportElective) {
        this.communityPassportValue = 1;
      } else {
        this.communityPassportValue = 0;
      }
    } else {
      this.isNew = true;

      this.elective = {
        name: "",
      } as Elective;
    }

    this.form = formBuilder.group({
      id: this.elective.id || 0,
      name: [this.elective.name, [Validators.required, Validators.maxLength(50)]],
      hasPrerequisite: [this.elective.hasPrerequisite || false],
      communityPassport: [this.communityPassportValue],
      semesterOne: [this.semesterOne],
      semesterTwo: [this.semesterTwo],
    });

    this.subscriptions.push(
      this.form.controls.semesterOne.valueChanges.subscribe(semesterOne => {
        this.semesterChange(semesterOne, this.form.controls.semesterTwo.value);
      }),
      this.form.controls.semesterTwo.valueChanges.subscribe(semesterTwo => {
        this.semesterChange(semesterTwo, this.form.controls.semesterOne.value);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  selectedGradesChanged(grades: string[]) {
    this.temporaryGradeLevels = [];
    this.selectedGradeLevels = grades;

    if (!grades.length) {
      this.temporarySemesters = [
        ...(this.form.controls.semesterOne.value ? [1] : []),
        ...(this.form.controls.semesterTwo.value ? [2] : []),
      ];
      this.form.controls.semesterOne.patchValue(false, { emitEvent: false });
      this.form.controls.semesterTwo.patchValue(false, { emitEvent: false });
    } else if (this.temporarySemesters.length) {
      this.form.controls.semesterOne.patchValue(this.temporarySemesters.includes(1), { emitEvent: false });
      this.form.controls.semesterTwo.patchValue(this.temporarySemesters.includes(2), { emitEvent: false });
    }
  }

  delete() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage:
            "Are you sure you want to delete this elective? Deleting an elective will also delete student selection for that elective. This cannot be undone.",
        },
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.adminService.deleteElective(this.elective.id).subscribe(result => {
            this.dialogRef.close(result);
          });
        }
      });
  }

  confirm() {
    if (this.form.valid) {
      this.semesterOne = this.form.controls["semesterOne"].value;
      this.semesterTwo = this.form.controls["semesterTwo"].value;
      this.elective.name = this.form.controls["name"].value;

      this.elective.isCommunityPassportElective = this.form.controls["communityPassport"].value === 1;
      this.elective.isCommunityPassportElectiveAlternate = this.form.controls["communityPassport"].value === 2;
      this.elective.hasPrerequisite = this.form.controls["hasPrerequisite"].value;

      let selectedSemesters = [];
      let semesterElectives = [];

      if (this.semesterOne) {
        selectedSemesters.push(1);
      }
      if (this.semesterTwo) {
        selectedSemesters.push(2);
      }

      selectedSemesters.forEach(s => {
        this.selectedGradeLevels.forEach(grade => {
          semesterElectives.push({
            gradeLevel: grade,
            electiveId: this.elective.id,
            semester: s,
          } as SemesterElective);
        });
      });

      this.elective.semesterElectives = semesterElectives;

      if (this.isNew) {
        this.adminService.addElective(this.elective).subscribe(result => {
          this.dialogRef.close(true);
        });
      } else {
        this.adminService.updateElective(this.elective).subscribe(result => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  private semesterChange(semesterChange: boolean, otherSemester: boolean) {
    if (!otherSemester) {
      if (semesterChange) {
        if (this.temporaryGradeLevels.length) {
          this.selectedGradeLevels = this.temporaryGradeLevels;
        }
      } else {
        this.temporaryGradeLevels = this.selectedGradeLevels;
        this.selectedGradeLevels = [];
      }
    }

    this.temporarySemesters = [];
  }
}
