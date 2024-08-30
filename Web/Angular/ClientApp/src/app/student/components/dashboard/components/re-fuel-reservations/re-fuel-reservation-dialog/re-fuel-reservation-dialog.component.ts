import { Component, HostListener, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ReFuelEligibility } from "@models/re-fuel-eligibility.model";
import { ReFuelReservation } from "@models/re-fuel-reservation.model";
import { ReFuelReservationType } from "app/enums";
import { Subscription } from "rxjs";

/** Used to create, view, or edit a reservation */
@Component({
  selector: "app-re-fuel-reservation-dialog",
  templateUrl: "./re-fuel-reservation-dialog.component.html",
  styleUrls: ["./re-fuel-reservation-dialog.component.scss"],
})
export class ReFuelReservationDialogComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];

  readonly ReFuelReservationType = ReFuelReservationType;
  readonly form = this.formBuilder.group({
    breakfast: [false],
    lunch: [false],
    generalInquiryResponse: ["", this.data.generalInquiry ? [Validators.required, Validators.maxLength(250)] : []],
    breakfastInquiryResponse: [""],
    lunchInquiryResponse: [""],
  });

  constructor(
    private readonly dialogRef: MatDialogRef<ReFuelReservationDialogComponent>,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ReFuelEligibility
  ) {}

  ngOnInit() {
    // dynamically require the breakfast/lunch responses if the student chooses either
    this.subscriptions.push(
      this.form.controls.breakfast.valueChanges.subscribe(value => {
        this.form.controls.breakfastInquiryResponse.setValidators(
          value ? [Validators.maxLength(250), Validators.required] : []
        );
      }),
      this.form.controls.lunch.valueChanges.subscribe(value => {
        this.form.controls.lunchInquiryResponse.setValidators(
          value ? [Validators.maxLength(250), value ? Validators.required : null] : []
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s?.unsubscribe());
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    let type = 0;

    if (this.form.value.breakfast) {
      type = ReFuelReservationType.Breakfast;
    }
    if (this.form.value.lunch) {
      type += ReFuelReservationType.Lunch;
    }

    const reservation: ReFuelReservation = {
      type,
      generalInquiryResponse: this.form.value.generalInquiryResponse,
      breakfastInquiryResponse: this.form.value.breakfastInquiryResponse,
      lunchInquiryResponse: this.form.value.lunchInquiryResponse,
    };

    this.dialogRef.close(reservation);
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(e: KeyboardEvent) {
    const enterKeyCode = 13;
    if (e.keyCode === enterKeyCode) {
      this.save();
      e.preventDefault();
    }
  }
}
