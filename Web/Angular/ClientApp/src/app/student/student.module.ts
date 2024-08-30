import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DesignModule } from "../design";
import {
  AnnouncementDialogComponent,
  EmailMentorDialogComponent,
  PointBreakdownDialogComponent,
  PointDetailDialogComponent,
  ReFuelReservationDayComponent,
  ReFuelReservationDialogComponent,
  ReFuelReservationsComponent,
  StudentDashboardComponent,
  StudentsMainComponent,
} from "./components";
import { EngagementDialogComponent } from "./components/dashboard/components/engagement-dialog/engagement-dialog.component";
import { StudentRoutingModule } from "./student-routing.module";

@NgModule({
  declarations: [
    AnnouncementDialogComponent,
    EmailMentorDialogComponent,
    PointBreakdownDialogComponent,
    StudentDashboardComponent,
    StudentsMainComponent,
    PointDetailDialogComponent,
    ReFuelReservationsComponent,
    ReFuelReservationDayComponent,
    ReFuelReservationDialogComponent,
    EngagementDialogComponent,
  ],
  imports: [CommonModule, DesignModule, StudentRoutingModule, FlexLayoutModule],
})
export class StudentModule {}
