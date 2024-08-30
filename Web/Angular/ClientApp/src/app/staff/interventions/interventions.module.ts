import { CdkStepperModule } from "@angular/cdk/stepper";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatStepperModule } from "@angular/material/stepper";
import { DesignModule } from "app/design";
import { InterventionsEmailTemplateComponent } from "./components/interventions-email-templates/components/interventions-email-template.component";
import { FromPipe } from "./components/interventions-email-templates/from.pipe";
import { InterventionsEmailTemplatesComponent } from "./components/interventions-email-templates/interventions-email-templates.component";
import { ToPipe } from "./components/interventions-email-templates/to.pipe";
import { InterventionsReportComponent } from "./components/interventions-report/interventions-report.component";
import { StudentsWithInterventionsComponent } from "./components/interventions-report/students-with-interventions/students-with-interventions.component";
import { EmailCommunicationDialogComponent } from "./components/interventions-student/email-communication-dialog/email-communication-dialog.component";
import { InterventionComponent } from "./components/interventions-student/intervention.component";
import { InterventionsStudentComponent } from "./components/interventions-student/interventions-student.component";
import { OwnerPipe } from "./components/interventions-student/owner.pipe";
import { TaskAttachmentsComponent } from "./components/interventions-student/task-attachments/task-attachments.component";
import { InterventionsRoutingModule } from "./interventions-routing.module";
@NgModule({
  declarations: [
    InterventionsEmailTemplatesComponent,
    InterventionsEmailTemplateComponent,
    InterventionsReportComponent,
    InterventionsStudentComponent,
    OwnerPipe,
    InterventionComponent,
    TaskAttachmentsComponent,
    FromPipe,
    ToPipe,
    StudentsWithInterventionsComponent,
    EmailCommunicationDialogComponent,
  ],
  imports: [
    CommonModule,
    DesignModule,
    FlexLayoutModule,
    InterventionsRoutingModule,
    MatStepperModule,
    CdkStepperModule,
  ],
})
export class InterventionsModule {}
