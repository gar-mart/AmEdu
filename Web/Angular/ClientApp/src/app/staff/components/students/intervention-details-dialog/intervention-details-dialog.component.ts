import { Component } from "@angular/core";
import { UntypedFormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { InterventionLevel } from "app/enums/intervention-level.enum";

@Component({
  selector: "app-intervention-details-dialog",
  templateUrl: "./intervention-details-dialog.component.html",
  styleUrls: ["./intervention-details-dialog.component.scss"],
})
export class InterventionDetailsDialogComponent {
  readonly warningInterventionLevel = InterventionLevel.Warning;
  readonly level1InterventionLevel = InterventionLevel.Level1;

  interventionLevelControl = new UntypedFormControl(null, [Validators.required]);
  saving = false;

  constructor(private dialogRef: MatDialogRef<InterventionDetailsDialogComponent>, private snackBar: MatSnackBar) {}

  confirm(): void {
    if (this.interventionLevelControl.invalid) {
      this.snackBar.open("Please select an option.", "Dismiss", { duration: 3000 });
      return;
    }

    this.saving = true;
    this.dialogRef.close(this.interventionLevelControl.value);
  }
}
