import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { DirectoryService } from "../../../../services";
import { Utility } from "../../../../shared";
import { PreviewEmailModel } from "./preview-email.model";

@Component({
  selector: "app-preview-email-dialog",
  templateUrl: "./preview-email-dialog.component.html",
  styleUrls: ["./preview-email-dialog.component.scss"],
})
export class PreviewEmailDialogComponent {
  previewEmailModel: PreviewEmailModel;
  disableSend: boolean;
  sendingEmail: boolean;
  fromEmailAddressIsValid: boolean;
  personalizationIsValid: boolean;

  constructor(
    private dialogRef: MatDialogRef<PreviewEmailDialogComponent>,
    private directoryService: DirectoryService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data: { previewEmailModel: PreviewEmailModel; personalizationTokens: string[] }
  ) {
    this.previewEmailModel = data.previewEmailModel;
    this.fromEmailAddressIsValid =
      !this.previewEmailModel.fromEmailAddress || Utility.emailAddressIsValid(this.previewEmailModel.fromEmailAddress);
    this.personalizationIsValid =
      this.previewEmailModel.allowPersonalization ||
      !data.personalizationTokens.some(token => this.previewEmailModel.body?.includes(token));
    this.disableSend =
      !this.previewEmailModel.body ||
      !this.previewEmailModel.subject ||
      !this.fromEmailAddressIsValid ||
      !this.personalizationIsValid;
  }

  sendEmail() {
    this.sendingEmail = true;
    this.directoryService
      .sendCommunicationEmail(this.previewEmailModel)
      .pipe(
        tap(() => {
          this.snackBar.open("Email sent!", "Close", { duration: 5000 });
          this.dialogRef.close(true);
        }),
        catchError(err => {
          this.sendingEmail = false;

          if (err?.error) {
            this.snackBar.open(err.error, "Close", { duration: 30000 });
            return of(null);
          } else {
            this.snackBar.open("There was an unhandled error attempting to send your email.", "Close", {
              duration: 30000,
            });
            return throwError(err);
          }
        })
      )
      .subscribe();
  }

  send() {
    if (this.disableSend) {
      return;
    }
    this.disableSend = true;
    this.sendEmail();
  }

  close() {
    this.dialogRef.close();
  }
}
