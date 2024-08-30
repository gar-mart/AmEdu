import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReportsRoutingModule } from "./reports-routing.module";

import { DesignModule } from "app/design";

import {
  AccomodationsDialogComponent,
  EngagementReportComponent,
  OrientationReportComponent,
  TardiesDialogComponent,
} from "./components";

import { FlexLayoutModule } from "@angular/flex-layout";
import { NgChartsModule } from "ng2-charts";
import { AbsencesDialogComponent } from "./components/engagement-report/components/absences-dialog/absences-dialog.component";
import { EnrollmentReportStudentAutocompleteComponent } from "./components/enrollment-report/enrollment-report-student-autocomplete.component";
import { EnrollmentReportComponent } from "./components/enrollment-report/enrollment-report.component";
import { CashOutPointsDialogComponent } from "./components/pbis-dashboard/cash-out-points-dialog/cash-out-points-dialog.component";
import { FlagResponsesChartComponent } from "./components/pbis-dashboard/flag-responses-chart/flag-responses-chart.component";
import { FlaggedStudentsTableComponent } from "./components/pbis-dashboard/flagged-students-table/flagged-students-table.component";
import { FlagsGeneratedChartComponent } from "./components/pbis-dashboard/flags-generated-chart/flags-generated-chart.component";
import { OutstandingEngagementFlagsTableComponent } from "./components/pbis-dashboard/outstanding-engagement-flags-table/outstanding-engagement-flags-table.component";
import { PbisDashboardComponent } from "./components/pbis-dashboard/pbis-dashboard.component";
import { PointDetailTableComponent } from "./components/pbis-dashboard/point-details-table/point-detail-table.component";
import { PointSourcePageChartComponent } from "./components/pbis-dashboard/point-source-page-chart/point-source-page-chart.component";
import { PointSourceStaffChartComponent } from "./components/pbis-dashboard/point-source-staff-chart/point-source-staff-chart.component";
import { PointTypesAwardedChartComponent } from "./components/pbis-dashboard/point-types-awarded-chart/point-types-awarded-chart.component";
import { RejectedEngagementFlagsTableComponent } from "./components/pbis-dashboard/rejected-engament-flags-table/rejected-engagement-flags-table.component";
import { StudentPictureReportComponent } from "./components/student-picture-report/student-picture-report.component";

@NgModule({
  declarations: [
    EngagementReportComponent,
    OrientationReportComponent,
    AccomodationsDialogComponent,
    TardiesDialogComponent,
    EnrollmentReportComponent,
    EnrollmentReportStudentAutocompleteComponent,
    AbsencesDialogComponent,
    StudentPictureReportComponent,
    PbisDashboardComponent,
    OutstandingEngagementFlagsTableComponent,
    FlaggedStudentsTableComponent,
    RejectedEngagementFlagsTableComponent,
    FlagResponsesChartComponent,
    PointSourcePageChartComponent,
    PointSourceStaffChartComponent,
    PointTypesAwardedChartComponent,
    FlagsGeneratedChartComponent,
    PointDetailTableComponent,
    CashOutPointsDialogComponent,
  ],
  imports: [CommonModule, ReportsRoutingModule, DesignModule, FlexLayoutModule, NgChartsModule],
})
export class ReportsModule {}
