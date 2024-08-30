import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Import Guards
import { AuthenticationGuard } from "../guards";

import { StudentDashboardComponent, StudentsMainComponent } from "./components";

const studentRoutes: Routes = [
  {
    path: "",
    component: StudentsMainComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "prefix",
      },
      {
        path: "dashboard",
        component: StudentDashboardComponent,
      },
      {
        path: "orientation",
        loadChildren: () =>
          import("./student-orientation/student-orientation.module").then(m => m.StudentOrientationModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(studentRoutes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
