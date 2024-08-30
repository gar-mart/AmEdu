import { DragDropModule } from "@angular/cdk/drag-drop";
import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { DesignModule } from "app/design";
import { OrientationModule as CommonOrientationModule } from "app/orientation/orientation.module";
import { ManageOrientationComponent } from "./components/manage-orientation.component";
import { SlideStatusPipe } from "./components/slide-status.pipe";
import { SlideContentComponent } from "./components/slide/slide-content.component";
import { SlideDetailsComponent } from "./components/slide/slide-details.component";
import { SlidePreviewComponent } from "./components/slide/slide-preview.component";
import { SlideComponent } from "./components/slide/slide.component";
import { OrientationRoutingModule } from "./orientation-routing.module";

@NgModule({
  declarations: [
    ManageOrientationComponent,
    SlideComponent,
    SlideDetailsComponent,
    SlideContentComponent,
    SlidePreviewComponent,
    SlideStatusPipe,
  ],
  imports: [
    CommonModule,
    OrientationRoutingModule,
    LayoutModule,
    ReactiveFormsModule,

    DesignModule,
    CommonOrientationModule,

    MatToolbarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,

    YouTubePlayerModule,
    DragDropModule,

    FlexLayoutModule,
  ],
  providers: [DatePipe],
})
export class OrientationModule {}
