import { Component } from "@angular/core";
import { BackdropClass } from "src/app/services/fd-dialog.service";
import { BaseDialogComponent } from "../base-dialog.component";

@Component({
  template: `
    <div mat-dialog-title>
      <h2>Unsaved Changes</h2>
    </div>

    <mat-dialog-content>
      <p>You have unsaved changes that may be lost if you leave this page.</p>

      Are you sure you wish to proceed?
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-stroked-button (click)="close(false)" cdkFocusInitial>Stay Here</button>
      <button mat-flat-button (click)="close(true)" color="warn">Leave This Page</button>
    </mat-dialog-actions>
  `,
})
export class DirtyFormDialogComponent extends BaseDialogComponent<never, boolean> {
  protected get backdropClass(): BackdropClass {
    return "intrinsic";
  }
}
