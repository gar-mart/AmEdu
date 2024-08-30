import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MentorRoutingModule } from "./mentor-routing.module";

import { StudentListComponent } from "./components";

import { DesignModule } from "../../design";

@NgModule({
  declarations: [StudentListComponent],
  imports: [CommonModule, DesignModule, MentorRoutingModule],
})
export class MentorModule {}
