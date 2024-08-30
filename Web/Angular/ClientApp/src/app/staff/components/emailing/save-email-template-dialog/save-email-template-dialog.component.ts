import { Component, HostListener, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { filter } from "rxjs/operators";
import { ConfirmationDialogComponent } from "../../../../design";
import { EmailTemplate } from "../../../../models/email-template.model";

@Component({
  templateUrl: "./save-email-template-dialog.component.html",
  styleUrls: ["./save-email-template-dialog.component.scss"],
})
export class SaveEmailTemplateDialogComponent {
  emailTemplate: EmailTemplate;
  disableSend: boolean;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SaveEmailTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: EmailTemplate
  ) {
    this.emailTemplate = data;
  }

  save() {
    this._close({ save: true, delete: false });
  }

  delete() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to delete this email template? This cannot be undone.",
        },
      })
      .beforeClosed()
      .pipe(filter(confirmationResult => confirmationResult))
      .subscribe(() => this._close({ save: false, delete: true }));
  }

  close() {
    this._close({ save: false, delete: false });
  }

  _close(result: SaveEmailTemplateDialogResult) {
    this.dialogRef.close(result);
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      this.save();
      e.preventDefault();
    }
  }
}

export interface SaveEmailTemplateDialogResult {
  save: boolean;
  delete: boolean;
}
