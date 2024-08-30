import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthenticationGuard, TeacherGuard } from "app/guards";

import { LiveLessonsComponent } from "./components";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthenticationGuard],
    canLoad: [TeacherGuard],
    children: [
      {
        path: "live-lessons",
        canActivate: [AuthenticationGuard],
        component: LiveLessonsComponent,
      },
      {
        path: "",
        redirectTo: "live-lessons",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
