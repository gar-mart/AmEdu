import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard, AuthenticationGuard } from "app/guards";
import {
  AppShortcutsComponent,
  BreaksComponent,
  EnrollmentImportComponent,
  InterventionThresholdsComponent,
  ManageElectivesComponent,
  ManageStaffComponent,
  ManageStudentResourcesComponent,
  ManageStudentsComponent,
} from "./components";

const adminRoutes: Routes = [
  {
    path: "",
    canActivate: [AuthenticationGuard],
    canLoad: [AdminGuard],
    children: [
      {
        path: "breaks",
        canActivate: [AuthenticationGuard],
        component: BreaksComponent,
      },
      {
        path: "enrollment-import",
        canActivate: [AuthenticationGuard],
        component: EnrollmentImportComponent,
      },
      {
        path: "intervention-thresholds",
        canActivate: [AuthenticationGuard],
        component: InterventionThresholdsComponent,
      },
      {
        path: "manage-students",
        canActivate: [AuthenticationGuard],
        component: ManageStudentsComponent,
      },
      {
        path: "manage-staff",
        canActivate: [AuthenticationGuard],
        component: ManageStaffComponent,
      },
      {
        path: "manage-electives",
        canActivate: [AuthenticationGuard],
        component: ManageElectivesComponent,
      },
      {
        path: "manage-student-resources",
        canActivate: [AuthenticationGuard],
        component: ManageStudentResourcesComponent,
      },
      {
        path: "app-shortcuts",
        canActivate: [AuthenticationGuard],
        component: AppShortcutsComponent,
      },
      {
        path: "",
        redirectTo: "manage-students",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
