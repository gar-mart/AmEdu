import { Component, Input, OnInit, QueryList, ViewChildren } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReFuelEligibility, Student } from "app/models";
import { ReFuelReservation } from "app/models/re-fuel-reservation.model";
import { Utility } from "app/shared";
import { Observable, forkJoin } from "rxjs";
import { map, tap } from "rxjs/operators";
import { StudentService } from "../../../../services";
import {
  ReFuelReservationDayComponent,
  ReFuelReservationDayInput,
} from "./re-fuel-reservation-day/re-fuel-reservation-day.component";

@Component({
  selector: "app-re-fuel-reservations",
  templateUrl: "./re-fuel-reservations.component.html",
  styleUrls: ["./re-fuel-reservations.component.scss"],
})
export class ReFuelReservationsComponent implements OnInit {
  @Input() student: Student;
  @ViewChildren(ReFuelReservationDayComponent) reservationComponents: QueryList<ReFuelReservationDayComponent>;

  tuesdayReservation: ReFuelReservation;
  tuesdayReservationDate: Date;
  tuesdayReservationEligibility: ReFuelEligibility;
  thursdayReservation: ReFuelReservation;
  thursdayReservationDate: Date;
  thursdayReservationEligibility: ReFuelEligibility;

  isLoading = true;
  isRefreshing = false;

  get easternTime(): Date {
    return Utility.getEasternTime();
  }

  get tuesdayInput(): ReFuelReservationDayInput {
    return {
      reservation: this.tuesdayReservation,
      date: this.tuesdayReservationDate,
      eligibility: this.tuesdayReservationEligibility,
      easternTime: this.easternTime,
    };
  }

  get thursdayInput(): ReFuelReservationDayInput {
    return {
      reservation: this.thursdayReservation,
      date: this.thursdayReservationDate,
      eligibility: this.thursdayReservationEligibility,
      easternTime: this.easternTime,
    };
  }

  constructor(private studentService: StudentService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadRefuelEligibility().subscribe();
  }

  refresh(silent: boolean) {
    this.isRefreshing = true;
    this.loadRefuelEligibility().subscribe(() => {
      if (!silent) {
        // wrap in setTimeout to allow component to render
        setTimeout(() => {
          if (!this.reservationComponents.first.canSignUp) {
            this.snackBar.open("RE:Fuel reservations will not be available until after 12pm on Friday!", "Dismiss", {
              duration: 10000,
            });
          }
        });
      }
    });
  }

  loadRefuelEligibility(): Observable<void> {
    // determine the date of the two RE:Fuel days based on the current beginning of week
    const fridayAtNoon = Utility.getFridayAtNoon();

    this.tuesdayReservationDate = new Date(fridayAtNoon);
    this.tuesdayReservationDate.setDate(fridayAtNoon.getDate() + 4);

    this.thursdayReservationDate = new Date(fridayAtNoon);
    this.thursdayReservationDate.setDate(fridayAtNoon.getDate() + 6);

    return forkJoin({
      tuesday: this.studentService.returnReFuelReservationById(this.student.id, this.tuesdayReservationDate).pipe(
        tap(x => {
          this.tuesdayReservation = x.reservation && x.reservation.rejectReasonType !== null ? null : x.reservation;
          this.tuesdayReservationEligibility = x.eligibility;
        })
      ),
      thursday: this.studentService.returnReFuelReservationById(this.student.id, this.thursdayReservationDate).pipe(
        tap(x => {
          this.thursdayReservation = x.reservation && x.reservation.rejectReasonType !== null ? null : x.reservation;
          this.thursdayReservationEligibility = x.eligibility;
        })
      ),
    }).pipe(
      tap(() => (this.isLoading = this.isRefreshing = false)),
      map(() => {})
    );
  }
}
