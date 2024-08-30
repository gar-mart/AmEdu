import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthenticationGuard, StaffGuard } from "app/guards";

import { ReFuelComponent } from ".";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthenticationGuard],
    canLoad: [StaffGuard],
    children: [
      {
        path: "",
        canActivate: [AuthenticationGuard],
        component: ReFuelComponent,
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReFuelCoordinatorRoutingModule {}
