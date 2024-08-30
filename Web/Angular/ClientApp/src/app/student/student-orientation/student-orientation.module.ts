import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { OrientationModule } from "app/orientation/orientation.module";
import { NgxMaskModule } from "ngx-mask";
import { DesignModule } from "../../design";
import { MentorBottomSheetComponent } from "./components/orientation-main/mentor-bottom-sheet/mentor-bottom-sheet";
import { OrientationMainComponent } from "./components/orientation-main/orientation-main.component";
import { StartOrientationConfirmationDialogComponent } from "./components/orientation-start/components/start-orientation-confirmation-dialog/start-orientation-confirmation-dialog.component";
import { OrientationStartComponent } from "./components/orientation-start/orientation-start.component";
import { SlideSkeletonComponent } from "./components/slide-skeleton/slide-skeleton.component";
import { SlideComponent } from "./components/slide/slide.component";
import { YoutubeVideoComponent } from "./components/youtube-video.component";
import { StudentOrientationRoutingModule } from "./student-orientation-routing.module";

@NgModule({
  declarations: [
    MentorBottomSheetComponent,
    OrientationMainComponent,
    OrientationStartComponent,
    StartOrientationConfirmationDialogComponent,
    SlideComponent,
    SlideSkeletonComponent,
    YoutubeVideoComponent,
  ],
  imports: [
    CommonModule,
    DesignModule,
    FlexLayoutModule,
    NgxMaskModule.forChild(),
    StudentOrientationRoutingModule,
    OrientationModule,
  ],
})
export class StudentOrientationModule {}
