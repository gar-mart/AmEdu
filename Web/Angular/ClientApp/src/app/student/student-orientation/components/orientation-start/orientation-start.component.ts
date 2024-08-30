import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { StartOrientationConfirmationDialogComponent } from "./components/start-orientation-confirmation-dialog/start-orientation-confirmation-dialog.component";

@Component({
  selector: "app-orientation-start",
  templateUrl: "./orientation-start.component.html",
  styleUrls: ["./orientation-start.component.scss"],
})
export class OrientationStartComponent {
  @Output() hasOrientationStartedChanged = new EventEmitter<boolean>();
  @Input() hasOrientationStarted: boolean;

  constructor(private dialog: MatDialog) {}

  openStartOrientationConfirmationDialog() {
    const dialogRef = this.dialog.open(StartOrientationConfirmationDialogComponent, {
      width: "450px",
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sendUpdatedOrientationStartStatus(result);
    });
  }

  sendUpdatedOrientationStartStatus(status: boolean) {
    this.hasOrientationStartedChanged.emit(status);
  }
}
