import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard, AuthenticationGuard, MentorGuard, StaffGuard, TeacherGuard } from "../guards";
import { EmailingComponent, QuoteOfTheDayComponent, StaffMainComponent, StudentsComponent } from "./components";

const staffRoutes: Routes = [
  {
    path: "",
    component: StaffMainComponent,
    canActivate: [AuthenticationGuard],
    canLoad: [StaffGuard],
    children: [
      // modules
      {
        path: "admin",
        loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
        canActivate: [AuthenticationGuard, AdminGuard],
      },
      {
        path: "mentor",
        loadChildren: () => import("./mentor/mentor.module").then(m => m.MentorModule),
        canActivate: [AuthenticationGuard, MentorGuard],
      },
      {
        path: "teacher",
        loadChildren: () => import("./teacher/teacher.module").then(m => m.TeacherModule),
        canActivate: [AuthenticationGuard, TeacherGuard],
      },
      {
        path: "re-fuel",
        loadChildren: () =>
          import("./re-fuel-coordinator/re-fuel-coordinator.module").then(m => m.ReFuelCoordinatorModule),
        canActivate: [AuthenticationGuard, StaffGuard],
      },
      {
        path: "reports",
        loadChildren: () => import("./reports/reports.module").then(m => m.ReportsModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: "manage-orientation",
        loadChildren: () => import("./orientation/orientation.module").then(m => m.OrientationModule),
        canActivate: [AuthenticationGuard, AdminGuard],
      },
      {
        path: "interventions",
        loadChildren: () => import("./interventions/interventions.module").then(m => m.InterventionsModule),
        canActivate: [AuthenticationGuard],
      },
      // components
      {
        path: "communication",
        canActivate: [AuthenticationGuard],
        component: EmailingComponent,
      },
      {
        path: "students",
        canActivate: [AuthenticationGuard],
        component: StudentsComponent,
      },
      {
        path: "quotes",
        canActivate: [AuthenticationGuard],
        component: QuoteOfTheDayComponent,
      },
      {
        path: "",
        redirectTo: "students",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(staffRoutes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
