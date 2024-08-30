import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthenticationGuard } from "../../guards/authentication.guard";

import { MentorAdminGuard } from "app/guards";
import { EngagementReportComponent, EnrollmentReportComponent, OrientationReportComponent } from "./components";
import { PbisDashboardComponent } from "./components/pbis-dashboard/pbis-dashboard.component";
import { StudentPictureReportComponent } from "./components/student-picture-report/student-picture-report.component";

const reportRoutes: Routes = [
  {
    path: "",
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: "engagement-report",
        canActivate: [AuthenticationGuard],
        component: EngagementReportComponent,
      },
      {
        path: "attendance-report",
        canActivate: [AuthenticationGuard],
        component: EnrollmentReportComponent,
      },
      {
        path: "orientation-report",
        canActivate: [AuthenticationGuard],
        canLoad: [MentorAdminGuard],
        component: OrientationReportComponent,
      },
      {
        path: "student-picture-report",
        canActivate: [AuthenticationGuard],
        canLoad: [MentorAdminGuard],
        component: StudentPictureReportComponent,
      },
      {
        path: "pbis-dashboard",
        canActivate: [AuthenticationGuard],
        component: PbisDashboardComponent,
      },
      {
        path: "",
        redirectTo: "orientation-report",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(reportRoutes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
