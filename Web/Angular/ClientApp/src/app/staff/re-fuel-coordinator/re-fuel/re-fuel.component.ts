import { Component, OnDestroy, OnInit } from "@angular/core";
import { NonNullableFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ReFuelInquiry } from "@models/re-fuel-inquiry.model";
import { AppComponent } from "app/app.component";
import { ReFuelReservationRejectReason } from "app/enums";
import { ReFuel, ReFuelReservation } from "app/models";
import { environment } from "environments/environment";
import { Subscription, forkJoin, of } from "rxjs";
import { filter, finalize, tap } from "rxjs/operators";
import { ReFuelCoordinatorService } from "../re-fuel-coordinator.service";
import { ReFuelReservationInput } from "./re-fuel-reservations/re-fuel-reservations.component";

@Component({
  selector: "app-re-fuel",
  templateUrl: "./re-fuel.component.html",
  styleUrls: ["./re-fuel.component.scss"],
})
export class ReFuelComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];

  readonly environment = environment;
  readonly ReFuelReservationRejectReason = ReFuelReservationRejectReason;
  readonly weekFilterOptions = this.initializeWeekFilterOptions();

  weekFilter: UntypedFormControl;

  isInitializing = true;
  form: UntypedFormGroup;
  inquiryFormGroup: UntypedFormGroup;

  /** flag that represents a user's permission to make edits */
  canEdit = false;
  editing = false;
  saving = false;

  reFuel: ReFuel;
  reservations: ReFuelReservation[];

  get tuesdayReservationsInput(): ReFuelReservationInput {
    return this.getReservationsInput(this.tuesday);
  }
  get thursdayReservationsInput(): ReFuelReservationInput {
    return this.getReservationsInput(this.thursday);
  }

  get tuesday(): Date {
    // every week starts on monday, use this to get tuesday
    const monday: Date = this.weekFilter.value;
    return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1);
  }
  get thursday(): Date {
    // every week starts on monday, use this to get thursday
    const monday: Date = this.weekFilter.value;
    return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 3);
  }

  constructor(
    private reFuelCoordinatorService: ReFuelCoordinatorService,
    private appComponent: AppComponent,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit() {
    setTimeout(() => (this.appComponent.isBusy = true));

    this.reFuelCoordinatorService
      .returnReFuel()
      .pipe(finalize(() => (this.appComponent.isBusy = false)))
      .subscribe(reFuel => {
        this.canEdit =
          this.reFuelCoordinatorService.user.isAdmin || this.reFuelCoordinatorService.user.isReFuelCoordinator;
        this.reFuel = reFuel;
        this.initializeReFuelForm(this.reFuel);
        this.loadDataTable(true);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  saveReFuelEdits() {
    if (this.form.invalid) {
      return;
    }

    this.appComponent.isBusy = this.saving = true;

    const updatedReFuel: ReFuel = this.form.value;

    this.reFuelCoordinatorService
      .updateReFuel(updatedReFuel)
      .pipe(
        finalize(() => (this.appComponent.isBusy = this.saving = false)),
        filter(result => result),
        tap(() => {
          this.reFuel = updatedReFuel;
          this.initializeReFuelForm(this.reFuel);
          this.loadDataTable();
        })
      )
      .subscribe();
  }

  saveInquiryEdits() {
    if (this.inquiryFormGroup.invalid) {
      return;
    }

    this.appComponent.isBusy = this.saving = true;

    const updatedInquiry: ReFuelInquiry = this.inquiryFormGroup.value;
    this.inquiryFormGroup.disable();
    this.weekFilter.disable();

    this.reFuelCoordinatorService
      .updateReFuelInquiry(updatedInquiry)
      .pipe(
        finalize(() => {
          this.inquiryFormGroup.enable();
          this.weekFilter.enable();
          this.appComponent.isBusy = this.saving = false;
        }),
        filter(result => result),
        tap(() => this.initializeInquiryForm(updatedInquiry))
      )
      .subscribe();
  }

  loadDataTable(alsoLoadInquiry = false) {
    this.appComponent.isBusy = true;

    if (alsoLoadInquiry) {
      this.inquiryFormGroup?.disable(); // this will be re-enabled in initializeInquiryForm
    }

    forkJoin({
      reservations: this.reFuelCoordinatorService
        .returnReFuelReservations(this.weekFilter.value)
        .pipe(
          tap(
            reservations =>
              (this.reservations = reservations.sort((a, b) => a.student.name.localeCompare(b.student.name)))
          )
        ),
      inquiry: !alsoLoadInquiry
        ? of<ReFuelInquiry>(null)
        : this.reFuelCoordinatorService
            .returnReFuelInquiry(this.weekFilter.value)
            .pipe(tap(inquiry => this.initializeInquiryForm(inquiry))),
    })
      .pipe(finalize(() => (this.appComponent.isBusy = false)))
      .subscribe();
  }

  private initializeReFuelForm(reFuel: ReFuel) {
    this.form = this.formBuilder.group({
      maxOpenPositions: [reFuel.maxOpenPositions, [Validators.required, Validators.min(0), Validators.max(1000)]],
      maxStandbyPositions: [reFuel.maxStandbyPositions, [Validators.required, Validators.min(0), Validators.max(1000)]],
      breakfastOffered: [reFuel.breakfastOffered],
      lunchOffered: [reFuel.lunchOffered],
    });

    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private initializeInquiryForm(inquiry: ReFuelInquiry) {
    this.inquiryFormGroup = this.formBuilder.group({
      date: [inquiry.date], // hidden
      generalInquiry: [inquiry.generalInquiry, [Validators.maxLength(500)]],
      breakfastInquiry: [inquiry.breakfastInquiry, [Validators.maxLength(500)]],
      lunchInquiry: [inquiry.lunchInquiry, [Validators.maxLength(500)]],
    });

    if (!this.canEdit) {
      this.inquiryFormGroup.disable();
    }
  }

  private initializeWeekFilterOptions(): Date[] {
    let weeks: Date[] = [];
    let week = new Date();
    // let the earliest week be up to one year ago.
    week.setFullYear(week.getFullYear() - 1);

    // start the weeks out on Monday
    while (week.getDay() !== 1) {
      week.setDate(week.getDate() - 1);
    }

    weeks.push(week);

    do {
      const nextWeek = new Date(week.getFullYear(), week.getMonth());
      nextWeek.setDate(week.getDate() + 7);
      week = nextWeek;
      weeks.push(week);
    } while (week < new Date());

    // order weeks descending
    weeks = weeks.reverse();

    this.weekFilter = new UntypedFormControl(weeks[1]); // default to current week
    this.subscriptions.push(this.weekFilter.valueChanges.subscribe(() => this.loadDataTable(true)));

    return weeks;
  }

  private getReservationsInput(day: Date): ReFuelReservationInput {
    return {
      reFuel: this.reFuel,
      week: this.weekFilter.value,
      day: day,
      reservations: this.reservations.filter(r => new Date(r.date).getTime() === day.getTime()),
      canEdit: this.canEdit,
    };
  }
}
