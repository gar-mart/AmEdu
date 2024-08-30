import { A11yModule } from "@angular/cdk/a11y";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { DesignModule } from "app/design";
import { NgxMaskModule } from "ngx-mask";
import { ContactContentTileComponent } from "./components/contact-content/contact-content-tile/contact-content-tile.component";
import { ContactContentComponent } from "./components/contact-content/contact-content.component";
import { EditQuizDialogComponent } from "./components/quiz-content/edit-quiz-dialog.component";
import { QuizContentComponent } from "./components/quiz-content/quiz-content.component";
import { ShortcutContentComponent } from "./components/shortcut-content/shortcut-content.component";
import { ShortcutTileComponent } from "./components/shortcut-content/shortcut-tile/shortcut-tile.component";
import { SignatureContentComponent } from "./components/signature-content/signature-content.component";
import { StepContentComponent } from "./components/step-content.component";
import { StudentResourceContentComponent } from "./components/student-resource-content/student-resource-content.component";
import { StudentResourceTileComponent } from "./components/student-resource-content/student-resource-tile/student-resource-tile.component";
import { ConnectionSurveyComponent } from "./components/system-content/connection-survey/connection-survey.component";
import { IntroVideoComponent } from "./components/system-content/intro-video/intro-video.component";
import { SemesterElectivesComponent } from "./components/system-content/semester-electives/semester-electives.component";
import { SendUsASelfieComponent } from "./components/system-content/send-us-a-selfie/send-us-a-selfie.component";
import { SystemContentComponent } from "./components/system-content/system-content.component";
import { VerifyYourEmailComponent } from "./components/system-content/verify-your-email/verify-your-email.component";
import { TextImageContentComponent } from "./components/text-image-content/text-image-content.component";
import { YouTubeVideoContentComponent } from "./components/you-tube-video-content/you-tube-video-content.component";

/** This modules holds declarations used in Manage Orientation as well as Student Orientation */
@NgModule({
  declarations: [
    StepContentComponent,
    YouTubeVideoContentComponent,
    ShortcutContentComponent,
    ShortcutTileComponent,
    StudentResourceContentComponent,
    StudentResourceTileComponent,
    ContactContentComponent,
    SystemContentComponent,
    IntroVideoComponent,
    VerifyYourEmailComponent,
    ConnectionSurveyComponent,
    SendUsASelfieComponent,
    ContactContentTileComponent,
    TextImageContentComponent,
    SignatureContentComponent,
    SemesterElectivesComponent,
    QuizContentComponent,
    EditQuizDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    DesignModule,

    A11yModule,
    DragDropModule,
    MatButtonModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTableModule,
    MatCardModule,

    NgxMaskModule.forChild(),
    FlexLayoutModule,
    YouTubePlayerModule,
  ],
  exports: [StepContentComponent],
})
export class OrientationModule {}
