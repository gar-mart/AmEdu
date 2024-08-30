import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DesignModule } from "../design";

import {
  AwardPointDialogComponent,
  CashOutPointsDialogComponent,
  CommunicationDialogComponent,
  CommunicationFilterComponent,
  EditRecipientsTabComponent,
  EmailingComponent,
  EmailTabComponent,
  EngagementFlagNotificationDialogComponent,
  FilterTabComponent,
  PreviewEmailDialogComponent,
  QuoteOfTheDayComponent,
  RejectEngagementFlagDialogComponent,
  SaveListDialogComponent,
  StaffMainComponent,
  StudentsComponent,
} from "./components";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { CommunicationFilterStaffComponent } from "./components/emailing/communication-filter-staff/communication-filter-staff.component";
import { CommunicationFilterStudentComponent } from "./components/emailing/communication-filter-student/communication-filter-student.component";
import { SaveEmailTemplateDialogComponent } from "./components/emailing/save-email-template-dialog/save-email-template-dialog.component";
import { AbsenceDialogComponent } from "./components/students/absence-dialog/absence-dialog.component";
import { GenerateInterventionDialogComponent } from "./components/students/generate-intervention-dialog/generate-intervention-dialog.component";
import { InterventionDetailsDialogComponent } from "./components/students/intervention-details-dialog/intervention-details-dialog.component";
import { StaffRoutingModule } from "./staff-routing.module";

@NgModule({
  declarations: [
    AwardPointDialogComponent,
    EmailingComponent,
    CommunicationDialogComponent,
    QuoteOfTheDayComponent,
    StaffMainComponent,
    StudentsComponent,
    CashOutPointsDialogComponent,
    EngagementFlagNotificationDialogComponent,
    RejectEngagementFlagDialogComponent,
    CommunicationFilterComponent,
    FilterTabComponent,
    EmailTabComponent,
    EditRecipientsTabComponent,
    PreviewEmailDialogComponent,
    SaveListDialogComponent,
    SaveEmailTemplateDialogComponent,
    CommunicationFilterStudentComponent,
    CommunicationFilterStaffComponent,
    AbsenceDialogComponent,
    InterventionDetailsDialogComponent,
    GenerateInterventionDialogComponent,
  ],
  imports: [CommonModule, DesignModule, StaffRoutingModule, MatSidenavModule, FlexLayoutModule],
})
export class StaffModule {}
