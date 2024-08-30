import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { InterventionTask } from "@models/intervention-task.model";
import { Intervention } from "@models/intervention.model";
import { ConfirmationDialogComponent } from "app/design";
import { InterventionScheduledMeetingStatus } from "app/enums/intervention-scheduled-meeting-status.enum";
import { InterventionStatus } from "app/enums/intervention-status.enum";
import { Subscription } from "rxjs";
import { filter, finalize, switchMap, tap } from "rxjs/operators";
import { InterventionService } from "../../interventions.service";
import { EmailCommunicationDialogComponent } from "./email-communication-dialog/email-communication-dialog.component";

@Component({
  selector: "app-intervention",
  templateUrl: "./intervention.component.html",
  styleUrls: ["./intervention.component.scss"],
})
export class InterventionComponent implements OnInit, OnChanges, OnDestroy {
  /** Refers to all the students interventions */
  @Input() interventions: Intervention[];
  @Input() intervention: Intervention;
  @Input() authorized: boolean;
  @Output() interventionsChange = new EventEmitter<Intervention[]>();
  @Output() reload = new EventEmitter<void>();

  private readonly subscriptions: Subscription[] = [];

  completingIntervention = false;
  emailCommunicationForm: UntypedFormGroup;
  scheduledMeetingForm: UntypedFormGroup;
  successPlanForm: UntypedFormGroup;
  truancyFormForm: UntypedFormGroup;
  disableInput = false;
  isDeleting = false;
  isVoiding = false;
  isUncompleting = false;
  isMostRecentLevelForVoiding = false;

  get userIsInterventionist() {
    return this.interventionService.user.isInterventionist;
  }
  get isInProgress() {
    return this.intervention.status === InterventionStatus.InProgress;
  }
  get isCompleted() {
    return this.intervention.status === InterventionStatus.Completed;
  }
  get isVoided() {
    return this.intervention.status === InterventionStatus.Voided;
  }
  get canEdit(): boolean {
    return (
      (this.userIsInterventionist || this.isInProgress) &&
      this.authorized &&
      !this.completingIntervention &&
      !this.disableInput &&
      !this.isDeleting &&
      !this.isVoiding &&
      !this.isUncompleting &&
      !this.isVoided // no one can do anything with a voided intervention
    );
  }
  get scheduleMeetingOccurred(): InterventionScheduledMeetingStatus {
    return InterventionScheduledMeetingStatus.MeetingOccurred;
  }
  get scheduleMeetingNoShow(): InterventionScheduledMeetingStatus {
    return InterventionScheduledMeetingStatus.NoShow;
  }
  get canDelete(): boolean {
    return (
      this.intervention.level === 0 &&
      this.userIsInterventionist &&
      !this.interventions.some(i => i.level > 0 && !i.logOnly)
    );
  }
  get canVoid() {
    return this.isMostRecentLevelForVoiding && this.userIsInterventionist && !this.isVoided;
  }

  constructor(
    private interventionService: InterventionService,
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setCanVoid();

    this.emailCommunicationForm = this.formBuilder.group({
      interventionId: this.intervention.id,
      isCompleted: this.intervention.emailCommunication.isCompleted,
      email: this.intervention.emailCommunication.email,
    });
    this.scheduledMeetingForm = this.formBuilder.group({
      interventionId: this.intervention.id,
      isCompleted: this.intervention.scheduledMeeting.isCompleted,
      dateOfMeeting: this.intervention.scheduledMeeting.dateOfMeeting,
      status: this.intervention.scheduledMeeting.status,
    });
    this.successPlanForm = this.formBuilder.group({
      interventionId: this.intervention.id,
      isCompleted: this.intervention.successPlan.isCompleted,
      successPlanCreatedDate: this.intervention.successPlan.successPlanCreatedDate,
      successPlanNotCreated: this.intervention.successPlan.successPlanNotCreated,
    });
    this.truancyFormForm = this.formBuilder.group({
      interventionId: this.intervention.id,
      isCompleted: this.intervention.truancyForm.isCompleted,
      markedCompleted: this.intervention.truancyForm.markedCompleted,
    });

    this.subscriptions.push(
      this.emailCommunicationForm.valueChanges.subscribe(() => this.updateEmailCommunication()),
      this.scheduledMeetingForm.valueChanges.subscribe(() => this.updateScheduledMeeting()),
      this.successPlanForm.valueChanges.subscribe(() => this.updateSuccessPlan()),
      this.truancyFormForm.valueChanges.subscribe(() => this.updateTruancyForm())
    );
  }

  ngOnChanges() {
    this.setCanVoid();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  canEditTask(task: InterventionTask) {
    return this.canEdit && (!task.isCompleted || this.userIsInterventionist);
  }

  openEmailCommunication(intervention: Intervention) {
    this.dialog
      .open(EmailCommunicationDialogComponent, {
        data: intervention,
      })
      .beforeClosed()
      .subscribe((intervention: Intervention) => {
        this.intervention = intervention ?? this.intervention;
      });
  }

  complete() {
    this.completingIntervention = true;
    this.interventionService
      .setInterventionStatus(this.intervention.id, InterventionStatus.Completed)
      .pipe(finalize(() => (this.completingIntervention = false)))
      .subscribe(result => (this.intervention = result));
  }

  delete() {
    if (!this.canDelete) {
      return;
    }

    this.dialog
      .open(ConfirmationDialogComponent, {
        data: { confirmationMessage: "Are you sure you want to delete this warning?" },
      })
      .beforeClosed()
      .pipe(
        filter((confirmed: boolean) => confirmed),
        tap(() => (this.isDeleting = true)),
        switchMap(() => this.interventionService.deleteIntervention(this.intervention.id)),
        tap(() => this.interventionsChange.emit(this.interventions.filter(i => i.id !== this.intervention.id))),
        finalize(() => (this.isDeleting = false))
      )
      .subscribe();
  }

  void() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          title: "Warning!",
          confirmationMessage: "Are you sure you want to void this Intervention? This cannot be undone.",
        },
      })
      .beforeClosed()
      .pipe(
        filter((confirmed: boolean) => confirmed),
        tap(() => (this.isVoiding = true)),
        switchMap(() =>
          this.interventionService.setInterventionStatus(this.intervention.id, InterventionStatus.Voided)
        ),
        tap(intervention => {
          this.interventions[this.interventions.indexOf(this.intervention)] = intervention;
          this.intervention = intervention;
          this.interventionsChange.emit([...this.interventions]);
          this.reload.emit();
          this.setCanVoid();
        }),
        finalize(() => (this.isVoiding = false))
      )
      .subscribe();
  }

  uncomplete() {
    this.isUncompleting = true;
    this.interventionService
      .setInterventionStatus(this.intervention.id, InterventionStatus.InProgress)
      .pipe(finalize(() => (this.isUncompleting = false)))
      .subscribe(result => (this.intervention = result));
  }

  private updateEmailCommunication() {
    this.interventionService
      .updateEmailCommunication(this.emailCommunicationForm.value)
      .subscribe(intervention =>
        this.handleUpdate(this.intervention.emailCommunication, intervention.emailCommunication)
      );
  }

  private updateSuccessPlan() {
    this.interventionService
      .updateSuccessPlan(this.successPlanForm.value)
      .subscribe(intervention => this.handleUpdate(this.intervention.successPlan, intervention.successPlan));
  }

  private updateScheduledMeeting() {
    this.interventionService
      .updateScheduledMeeting(this.scheduledMeetingForm.value)
      .subscribe(intervention => this.handleUpdate(this.intervention.scheduledMeeting, intervention.scheduledMeeting));
  }

  private updateTruancyForm() {
    this.interventionService
      .updateTruancyForm(this.truancyFormForm.value)
      .subscribe(intervention => this.handleUpdate(this.intervention.truancyForm, intervention.truancyForm));
  }

  private handleUpdate(currentTask: InterventionTask, updatedTask: InterventionTask) {
    currentTask.isCompleted = updatedTask.isCompleted;
    currentTask.completedByUserId = updatedTask.completedByUserId;
    currentTask.completedByUserName = updatedTask.completedByUserName;
    currentTask.completedDate = updatedTask.completedDate;
  }

  private setCanVoid() {
    this.isMostRecentLevelForVoiding =
      this.intervention?.id ===
      this.interventions
        .filter(i => !i.logOnly && i.status !== InterventionStatus.Voided) // ignore logs and voided interventions
        .sort((a, b) => b.level - a.level)?.[0]?.id;
  }
}
