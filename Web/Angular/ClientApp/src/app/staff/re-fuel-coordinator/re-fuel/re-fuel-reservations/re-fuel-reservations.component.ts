import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { AvatarDialogComponent } from "app/design";
import { ReFuelReservationRejectReason, ReFuelReservationType } from "app/enums";
import { ReFuel, ReFuelReservation, Student } from "app/models";
import { environment } from "environments/environment";
import { ReservationDialogComponent } from "../reservation-dialog/reservation-dialog.component";

@Component({
  selector: "app-re-fuel-reservations",
  templateUrl: "./re-fuel-reservations.component.html",
  styleUrls: ["./re-fuel-reservations.component.scss"],
})
export class ReFuelReservationsComponent implements OnInit, OnChanges {
  // #region Input
  @Input() input: ReFuelReservationInput;
  get reFuel() {
    return this.input.reFuel;
  }
  get week() {
    return this.input.week;
  }
  get day() {
    return this.input.day;
  }
  get reservations() {
    return this.input.reservations;
  }
  get canEdit() {
    return this.input.canEdit;
  }
  // #endregion

  @Output() reload = new EventEmitter();

  environment = environment;
  ReFuelReservationRejectReason = ReFuelReservationRejectReason;
  ReFuelReservationType = ReFuelReservationType;

  get tables() {
    return [this.reservedData, this.rejectedData, this.standbyData].filter(table => table.toggle.show);
  }

  reservedData: Table = {
    displayedColumns: ["actions", "name", "type", "checkinout"],
    dataSource: new MatTableDataSource<ReFuelReservation>(),
    title: "Scheduled",
    toggle: {
      show: true,
      toggleTo: null,
    },
  };

  rejectedData: Table = {
    displayedColumns: ["actions", "name", "rejectReason"],
    dataSource: new MatTableDataSource<ReFuelReservation>(),
    title: "Rejections",
    toggle: {
      show: false,
      toggleTo: null,
    },
  };

  standbyData: Table = {
    displayedColumns: ["actions", "name", "standByPosition"],
    dataSource: new MatTableDataSource<ReFuelReservation>(),
    title: "Wait List",
    toggle: {
      show: true,
      toggleTo: null,
    },
  };

  noResultsMessage = "No results.";

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.rejectedData.toggle.toggleTo = this.standbyData;
    this.standbyData.toggle.toggleTo = this.rejectedData;
  }

  ngOnInit() {
    this.reservedData.dataSource = new MatTableDataSource<ReFuelReservation>(
      this.input.reservations.filter(r => r.standbyPosition === null && r.rejectReasonType === null)
    );
    this.rejectedData.dataSource = new MatTableDataSource<ReFuelReservation>(
      this.input.reservations.filter(r => r.rejectReasonType !== null)
    );
    this.standbyData.dataSource = new MatTableDataSource<ReFuelReservation>(
      this.input.reservations
        .filter(r => r.standbyPosition !== null)
        .sort((a, b) => a.standbyPosition - b.standbyPosition)
    );
  }

  ngOnChanges() {
    this.ngOnInit(); // refresh data sources
  }

  rejectReasonTypeDisplay(reservation: ReFuelReservation) {
    let rejectReason: string;

    switch (reservation.rejectReasonType) {
      case ReFuelReservationRejectReason.Behavior:
        rejectReason = "Behavior";
        break;
      case ReFuelReservationRejectReason.CancelledByStudent:
        rejectReason = "Cancelled by student";
        break;
      case ReFuelReservationRejectReason.CreatedByMistake:
        rejectReason = "Created by mistake";
        break;
      default:
        return reservation.rejectReasonComment;
    }

    if (reservation.rejectReasonComment) {
      return `${rejectReason} - ${reservation.rejectReasonComment}`;
    }

    return rejectReason;
  }

  openStudentAvatarDialog(student: Student) {
    this.dialog.open(AvatarDialogComponent, {
      autoFocus: false,
      panelClass: ["rounded-dialog-window"],
      data: {
        student: student,
      },
    });
  }

  editReservation(reservation: ReFuelReservation, checkInOutReservation: boolean, canEdit: boolean) {
    this.dialog
      .open(ReservationDialogComponent, {
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          reservation,
          week: this.input.week,
          checkInOut: checkInOutReservation,
          canEdit,
        },
      })
      .beforeClosed()
      .subscribe(reload => {
        if (reload) {
          this.reload.emit();
        }
      });
  }

  afterToday(reservation: ReFuelReservation) {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() <= new Date(reservation.date).getTime();
  }

  toggleTable(table: Table) {
    table.toggle.show = false;
    table.toggle.toggleTo.toggle.show = true;
  }

  foodRequestDisplay(type: ReFuelReservationType) {
    switch (type) {
      case ReFuelReservationType.Breakfast:
        return "Breakfast";

      case ReFuelReservationType.Lunch:
        return "Lunch";

      case ReFuelReservationType.Breakfast + ReFuelReservationType.Lunch:
        return "Breakfast & Lunch";

      default:
        return "None";
    }
  }
}

export interface ReFuelReservationInput {
  reFuel: ReFuel;
  week: Date;
  day: Date;
  reservations: ReFuelReservation[];
  canEdit: boolean;
}

interface Table {
  displayedColumns: string[];
  dataSource: MatTableDataSource<ReFuelReservation>;
  title: string;
  toggle: {
    show: boolean;
    toggleTo: Table | null;
  };
}
