import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmationDialogComponent } from "app/design";
import { ReFuelEligibility, ReFuelReservation } from "app/models";
import { filter, finalize, switchMap, tap } from "rxjs/operators";
import { StudentService } from "../../../../../services";
import { ReFuelReservationDialogComponent } from "../re-fuel-reservation-dialog/re-fuel-reservation-dialog.component";

@Component({
  selector: "app-re-fuel-reservation-day",
  templateUrl: "./re-fuel-reservation-day.component.html",
  styleUrls: ["./re-fuel-reservation-day.component.scss"],
})
export class ReFuelReservationDayComponent {
  @Input() input: ReFuelReservationDayInput;
  @Output() reload = new EventEmitter();

  isSaving = false;

  get reservation() {
    return this.input.reservation;
  }
  get date() {
    return this.input.date;
  }
  get eligibility() {
    return this.input.eligibility;
  }
  get easternTime() {
    return this.input.easternTime;
  }
  get canSignUp(): boolean {
    switch (this.easternTime.getDay()) {
      // students can sign up for next week's reservations on Saturday and Sunday
      case 0:
      case 6:
        return true;

      // on Monday, students can only sign up for next week's reservations if it is before 5pm
      case 1:
        return this.easternTime.getHours() < 17;

      // on Friday, students can only sign up for next week's reservations if it is after noon
      case 5:
        return this.easternTime.getHours() >= 12;

      default:
        // students can only view the current week's reservations on Tuesday, Wednesday, and Thursday
        return false;
    }
  }

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private studentService: StudentService) {}

  getEligibilityMessage(): string {
    if (!this.eligibility || this.eligibility.allRequirementsMet) {
      return "";
    }

    if (!this.eligibility.canClaimStandbyPosition) {
      return "There are no spots left to claim.";
    }
    if (!this.eligibility.gradeRequirementMet || !this.eligibility.liveLessonRequirementMet) {
      return "You must be passing 4 courses, and meet all your live lessons requirements for last week. If you are taking less than 4 courses, then you must be passing all of them.";
    }
    if (!this.eligibility.reservationRejectedRequirementMet) {
      return "A staff members rejected your reservation.";
    }

    // default message in case something goes wrong and one of the above messages do not show up.
    // this case should not happen in theory
    return "You did not meet all the requirements.";
  }

  cancelReservation() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to cancel this reservation?",
        },
      })
      .beforeClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.isSaving = true;
          this.studentService
            .cancelReFuelReservation(this.date)
            .subscribe(() => {
              this.reload.emit(null);
              this.snackBar.open("Your reservation was cancelled", "Close", { duration: 3500 });
            })
            .add(() => (this.isSaving = false));
        }
      });
  }

  reserveSpot() {
    this.dialog
      .open(ReFuelReservationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: this.input.eligibility,
      })
      .beforeClosed()
      .pipe(
        filter(reservation => !!reservation),
        switchMap((reservation: ReFuelReservation) => {
          this.isSaving = true;

          return this.studentService.reserveReFuelReservation(this.date, reservation).pipe(
            tap(result => {
              if (!this.eligibility.canClaimOpenSpot && result.openSpot) {
                this.snackBar.open("You claimed an open position!", "Close");
              } else if (!result.openSpot && !result.standbyPosition) {
                this.snackBar.open("Someone else claimed this spot before you. Your spot was not saved.", "Close");
              } else if (this.eligibility.canClaimOpenSpot && !result.openSpot) {
                this.snackBar.open(
                  "Someone else claimed this spot before you, but you were added to the wait list.",
                  "Close"
                );
              } else {
                this.snackBar.open("Reservation made", "Close", { duration: 3500 });
              }

              this.reload.emit(null);
            }),
            finalize(() => (this.isSaving = false))
          );
        })
      )
      .subscribe();
  }
}

export interface ReFuelReservationDayInput {
  reservation: ReFuelReservation;
  date: Date;
  eligibility: ReFuelEligibility;
  easternTime: Date;
}
