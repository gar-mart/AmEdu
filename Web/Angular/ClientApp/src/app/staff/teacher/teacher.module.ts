import { NgModule } from "@angular/core";
import { TeacherRoutingModule } from "./teacher-routing.module";

import { DesignModule } from "app/design";

import { AbsencesDialogComponent, LiveLessonsComponent, TardinessDialogComponent } from "./components";

@NgModule({
  declarations: [LiveLessonsComponent, TardinessDialogComponent, AbsencesDialogComponent],
  imports: [TeacherRoutingModule, DesignModule],
})
export class TeacherModule {}
