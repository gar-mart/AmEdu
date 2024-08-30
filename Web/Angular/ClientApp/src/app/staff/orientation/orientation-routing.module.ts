import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageOrientationComponent } from "./components/manage-orientation.component";

const routes: Routes = [
  { path: "", redirectTo: "0/0", pathMatch: "full" },
  { path: ":id", redirectTo: ":id/0", pathMatch: "full" },
  { path: ":id/:tabIndex", component: ManageOrientationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrientationRoutingModule {}
