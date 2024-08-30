import { Component, Inject, ViewChild } from "@angular/core";
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "@design/confirmation-dialog/confirmation-dialog.component";
import { StudentResource } from "@models/student-resource.model";
import { AdminService } from "@services/admin.service";
import { Utility } from "app/shared";

@Component({
  selector: "app-manage-student-resources-dialog",
  templateUrl: "./manage-student-resources-dialog.component.html",
  styleUrls: ["./manage-student-resources-dialog.component.scss"],
})
export class ManageStudentResourcesDialogComponent {
  isNew: boolean = false;
  @ViewChild("formDirective", { static: false }) private formDirective: NgForm;
  form: UntypedFormGroup;
  studentResource: StudentResource;
  selectedGradeLevels = [] as string[];
  saving: boolean;

  constructor(
    private adminService: AdminService,
    formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<ManageStudentResourcesDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: StudentResource
  ) {
    this.studentResource = data;

    if (this.studentResource) {
      this.studentResource.studentResourceGradeLevels.forEach(gradeLevel => {
        this.selectedGradeLevels.push(gradeLevel.gradeLevel);
      });

      this.form = formBuilder.group({
        id: [this.studentResource.id],
        title: [this.studentResource.title, [Validators.required, Validators.maxLength(50)]],
        category: [this.studentResource.category, [Validators.required, Validators.maxLength(50)]],
        url: [this.studentResource.url, [Validators.required, Validators.maxLength(250), Utility.urlValidator]],
        showOnStudentDashboard: [this.studentResource.showOnStudentDashboard],
      });
    } else {
      this.isNew = true;
      this.form = formBuilder.group({
        id: 0,
        title: ["", [Validators.required, Validators.maxLength(50)]],
        category: ["", [Validators.required, Validators.maxLength(50)]],
        url: ["", [Validators.required, Validators.maxLength(250), Utility.urlValidator]],
        showOnStudentDashboard: false,
      });

      this.studentResource = {
        title: "",
        category: "",
        url: "",
        showOnStudentDashboard: false,
      } as StudentResource;
    }
  }

  selectedGradesChanged(grades: string[]) {
    this.selectedGradeLevels = grades;
  }

  delete() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to delete this student resource? This cannot be undone.",
        },
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.adminService.deleteStudentResource(this.studentResource.id).subscribe(result => {
            if (result) {
              this.dialogRef.close(true);
            }
          });
        }
      });
  }

  confirm() {
    if (this.form.valid) {
      this.studentResource.title = this.form.controls["title"].value;
      this.studentResource.category = this.form.controls["category"].value;
      this.studentResource.url = this.form.controls["url"].value;
      this.studentResource.showOnStudentDashboard = this.form.controls["showOnStudentDashboard"].value;

      this.studentResource.studentResourceGradeLevels = this.selectedGradeLevels.map(g => {
        return {
          gradeLevel: g,
          studentResourceId: this.studentResource.id,
        };
      });

      if (this.isNew) {
        this.adminService.addStudentResource(this.studentResource).subscribe(result => {
          if (result) {
            this.dialogRef.close(true);
          }
        });
      } else {
        this.adminService.updateStudentResource(this.studentResource).subscribe(result => {
          if (result) {
            this.dialogRef.close(true);
          }
        });
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
