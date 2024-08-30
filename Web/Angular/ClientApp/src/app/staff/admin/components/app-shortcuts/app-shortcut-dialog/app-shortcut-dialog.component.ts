import { Component, Inject } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "@design/confirmation-dialog/confirmation-dialog.component";
import { AdminService } from "@services/admin.service";
import { Utility } from "app/shared";
import { forkJoin, of } from "rxjs";
import { AppTileMetadata } from "../../../../../models";

@Component({
  selector: "app-shortcut-dialog",
  templateUrl: "./app-shortcut-dialog.component.html",
  styleUrls: ["./app-shortcut-dialog.component.scss"],
})
export class AppShortcutDialogComponent {
  isNew: boolean = false;
  form: UntypedFormGroup;
  appTile: AppTileMetadata;
  imageFile: File;
  selectedGradeLevels: string[] = [];
  saving: boolean;
  readingFile = false;
  imageError = false;

  constructor(
    private adminService: AdminService,
    formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<AppShortcutDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: AppTileMetadata
  ) {
    this.appTile = data || {
      title: "",
      url: "",
      alwaysShow: false,
      isDefault: false,
      defaultOrderBy: 0,
      id: 0,
      image: "",
      gradeLevelString: "",
      gradeLevels: [],
      appTileGradeLevels: [],
    };

    this.appTile.appTileGradeLevels.forEach(gradeLevel => {
      this.selectedGradeLevels.push(gradeLevel.gradeLevel);
    });

    this.isNew = this.appTile.id === 0;

    this.form = formBuilder.group({
      id: [this.appTile.id || 0],
      title: [this.appTile.title || "", [Validators.required, Validators.maxLength(50)]],
      url: [this.appTile.url || "", [Validators.required, Validators.maxLength(250), Utility.urlValidator]],
      cannotBeHidden: [this.appTile.alwaysShow],
      shownByDefault: [this.appTile.isDefault],
      image: [this.appTile.image],
    });
  }

  selectedGradesChanged(grades: string[]) {
    this.selectedGradeLevels = grades;
  }

  confirm() {
    if (this.form.valid) {
      this.appTile.title = this.form.controls["title"].value;
      this.appTile.url = this.form.controls["url"].value;
      this.appTile.alwaysShow = this.form.controls["cannotBeHidden"].value;
      this.appTile.isDefault = this.form.controls["shownByDefault"].value;

      this.appTile.appTileGradeLevels = this.selectedGradeLevels.map(g => {
        return {
          gradeLevel: g,
          appTileMetadataId: this.appTile.id,
        };
      });

      if (this.isNew) {
        if (this.imageFile) {
          this.saving = true;
          this.adminService
            .addAppTileMetadata(this.appTile)
            .subscribe(result => {
              this.appTile.id = result;
              if (result) {
                // we must wait until the shortcut was created before we can upload the image
                this.adminService.uploadAppTileMetadataImage(this.appTile.id, this.imageFile).subscribe(() => {
                  this.dialogRef.close(true);
                });
              }
            })
            .add(() => (this.saving = false));
        } else {
          this.imageError = true;
        }
      } else {
        this.saving = true;
        forkJoin({
          updateModel: this.adminService.updateAppTileMetadata(this.appTile),
          updateImage: this.imageFile
            ? this.adminService.uploadAppTileMetadataImage(this.appTile.id, this.imageFile)
            : of(true),
        })
          .subscribe(result => {
            if (result.updateImage && result.updateModel) {
              this.dialogRef.close(true);
            }
          })
          .add(() => (this.saving = false));
      }
    }
  }

  delete() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to delete this app shortcut? This cannot be undone.",
        },
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.saving = true;
          this.adminService
            .deleteAppShortcut(this.appTile.id)
            .subscribe(result => {
              if (result) {
                this.dialogRef.close(true);
              }
            })
            .add(() => (this.saving = false));
        }
      });
  }

  cancel() {
    this.dialogRef.close();
  }

  uploadInputChange(fileInputEvent: Event) {
    const fileInput = fileInputEvent.target as HTMLInputElement;
    this.imageFile = fileInput.files[0];
    this.imageError = false;

    this.readingFile = true;
    const fileReader = new FileReader();
    fileReader.onload = e => {
      this.form.controls.image.setValue(e.target.result);
      this.readingFile = false;
    };

    fileReader.readAsDataURL(this.imageFile);
  }
}
