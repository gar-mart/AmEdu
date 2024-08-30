import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthenticationGuard, MentorGuard } from "../../guards";

import { StudentListComponent } from "./components";

const mentorRoutes: Routes = [
  {
    path: "",
    canActivate: [AuthenticationGuard],
    canLoad: [MentorGuard],
    children: [
      {
        path: "student-list",
        canActivate: [AuthenticationGuard],
        component: StudentListComponent,
      },
      {
        path: "",
        redirectTo: "student-list",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mentorRoutes)],
  exports: [RouterModule],
})
export class MentorRoutingModule {}
