import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";

import { DesignModule } from "app/design";

import { ReFuelComponent, ReFuelReservationsComponent, ReservationDialogComponent } from ".";
import { ReFuelCoordinatorRoutingModule } from "./re-fuel-coordinator-routing.module";

@NgModule({
  declarations: [ReFuelComponent, ReservationDialogComponent, ReFuelReservationsComponent],
  imports: [ReFuelCoordinatorRoutingModule, DesignModule, FlexLayoutModule],
})
export class ReFuelCoordinatorModule {}
