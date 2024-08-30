import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { AppComponent } from "app/app.component";
import { ReFuelReservationRejectReason } from "app/enums";
import { ReFuelLog, ReFuelReservation } from "app/models";
import { Observable } from "rxjs";
import { ReFuelCoordinatorService } from "../../re-fuel-coordinator.service";

/** Used to create, view, or edit a reservation */
@Component({
  selector: "app-reservation-dialog",
  templateUrl: "./reservation-dialog.component.html",
  styleUrls: ["./reservation-dialog.component.scss"],
})
export class ReservationDialogComponent implements OnInit, AfterViewInit {
  @ViewChild("rejectReasonComment") private rejectReasonComment: ElementRef<HTMLTextAreaElement>;

  reservation: ReFuelReservation;
  week: Date;
  canEdit: boolean;

  /** flag indicating whether this is a check in/out process or a reject process */
  checkInOut = false;

  /** flag indicating this is a check in rather than a check out. Only applicable if checkInOut is true */
  checkIn = false;
  displayedColumns: string[] = ["delete", "checkedIn", "checkedOut"];
  dataSource = new MatTableDataSource<ReFuelLog>();

  rejectReasons: { text: string; value: ReFuelReservationRejectReason }[];
  form: UntypedFormGroup;

  constructor(
    private reFuelCoordinatorService: ReFuelCoordinatorService,
    private dialogRef: MatDialogRef<ReservationDialogComponent>,
    private snackBar: MatSnackBar,
    formBuilder: UntypedFormBuilder,
    public appComponent: AppComponent,
    @Inject(MAT_DIALOG_DATA)
    data: {
      reservation: ReFuelReservation;
      week: Date;
      checkInOut: boolean;
      canEdit: boolean;
    }
  ) {
    this.reservation = data.reservation;
    this.week = data.week;
    this.checkInOut = data.checkInOut;
    this.canEdit = data.canEdit;

    if (!this.checkInOut) {
      this.rejectReasons = [
        { text: "Behavior", value: ReFuelReservationRejectReason.Behavior },
        { text: "Created by mistake", value: ReFuelReservationRejectReason.CreatedByMistake },
        { text: "Other", value: ReFuelReservationRejectReason.Other },
      ];

      this.form = formBuilder.group({
        studentId: [data.reservation.studentId],
        date: [data.reservation.date],
        rejectReasonType: [ReFuelReservationRejectReason.Behavior],
        rejectReasonComment: ["", [Validators.maxLength(500)]],
      });

      const rejectReasonCommentControl = this.form.controls["rejectReasonComment"];

      this.form.controls["rejectReasonType"].valueChanges.subscribe(value => {
        // dynamically set required validator on reject reason type changes

        const newValidators = [Validators.maxLength(500)];

        if (value === ReFuelReservationRejectReason.Other) {
          newValidators.push(Validators.required);
        }

        rejectReasonCommentControl.setValidators(newValidators);
        rejectReasonCommentControl.updateValueAndValidity();
      });
    }
  }

  ngOnInit(): void {
    if (this.checkInOut) {
      setTimeout(() => (this.appComponent.isBusy = true));
      this.reFuelCoordinatorService
        .returnReFuelLogs(this.reservation.studentId, new Date(this.reservation.date))
        .subscribe(logs => {
          logs.forEach(log => {
            log.checkedOut = log.checkedOut ? new Date(log.checkedOut) : null;
            log.checkedIn = new Date(log.checkedIn);
          });
          if (!logs.length || logs[0].checkedOut) {
            this.checkIn = true;
            if (this.canEdit) {
              logs.unshift({ studentId: this.reservation.studentId, checkedIn: new Date(), checkedOut: null });
            }
          } else if (this.canEdit) {
            logs[0].checkedOut = new Date();
          }

          if (logs.length) {
            logs[0].automaticallySet = this.canEdit;
          }

          this.dataSource = new MatTableDataSource<ReFuelLog>(logs);
        })
        .add(() => (this.appComponent.isBusy = false));
    }
  }

  ngAfterViewInit() {
    if (!this.checkInOut) {
      setTimeout(() => this.rejectReasonComment.nativeElement.select());
    }
  }

  delete(reservation: ReFuelReservation) {
    this.dataSource.data = this.dataSource.data.filter(r => r !== reservation);
  }

  close(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    let updateRequest: Observable<boolean>;

    if (this.checkInOut) {
      if (this.dataSource.data.some(log => !log.checkedIn)) {
        this.snackBar.open("All checked in times must be set.", "Close");
        return;
      }

      if (this.dataSource.data.some((log, index) => index > 0 && !log.checkedOut)) {
        this.snackBar.open("Only the first entry may have an empty checked out time.", "Close");
        return;
      }

      if (this.dataSource.data.some(log => log.checkedIn >= log.checkedOut && !!log.checkedOut)) {
        this.snackBar.open("Checked in times must come before checked out times.", "Close");
        return;
      }

      updateRequest = this.reFuelCoordinatorService.updateReFuelLogs(
        this.dataSource.data,
        this.reservation.studentId,
        new Date(this.reservation.date)
      );
    } else {
      if (this.form.invalid) {
        return;
      }

      const reservation: ReFuelReservation = this.form.value;

      reservation.rejectReasonComment = reservation.rejectReasonComment || null;

      updateRequest = this.reFuelCoordinatorService.updateReFuelReservation(reservation).pipe(result => {
        if (result) {
          // if the update was successful, update the view model
          this.reservation.rejectReasonType = reservation.rejectReasonType;
          this.reservation.rejectReasonComment = reservation.rejectReasonComment;
        }
        return result;
      });
    }

    this.appComponent.isBusy = true;
    updateRequest
      .subscribe(result => {
        this.dialogRef.close(result); // return true if the caller should refresh the data table
      })
      .add(() => (this.appComponent.isBusy = false));
  }

  getTime(date: Date) {
    if (!date) {
      return null;
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? "0" + hours.toString() : hours}:${minutes < 10 ? "0" + minutes.toString() : minutes}`;
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
