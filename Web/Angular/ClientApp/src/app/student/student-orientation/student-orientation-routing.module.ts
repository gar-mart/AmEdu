import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Import Guards
import { AuthenticationGuard } from "@guards/authentication.guard";
import { OrientationMainComponent } from "./components/orientation-main/orientation-main.component";
import { SlideComponent } from "./components/slide/slide.component";

const studentRoutes: Routes = [
  {
    path: "",
    component: OrientationMainComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: "slide/:stepId",
        component: SlideComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(studentRoutes)],
  exports: [RouterModule],
})
export class StudentOrientationRoutingModule {}
