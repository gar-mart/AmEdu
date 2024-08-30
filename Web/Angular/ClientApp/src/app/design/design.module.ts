import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateFormats,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { FDAngularRichTextWrapperComponent } from "@design/fdangular-rich-text-wrapper/fdangular-rich-text-wrapper.component";
import { SignaturePadComponent } from "@design/signature-pad/signature-pad.component";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { MatTableExporterModule } from "mat-table-exporter";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { UiScrollModule } from "ngx-ui-scroll";
import {
  AvatarDialogComponent,
  ClassDialogComponent,
  ConfirmationDialogComponent,
  DialogComponent,
  GradeLevelSelectorComponent,
  NotAuthorizedComponent,
  PageNotFoundComponent,
  QuizComponent,
  SignatureFieldComponent,
  TabGroupComponent,
  ToolbarComponent,
} from "./components";
import { ChooseAGradeComponent } from "./components/choose-a-grade/choose-a-grade.component";
import { EngagementMetricBreakdownDialogComponent } from "./components/engagement-metric-breakdown-dialog/engagement-metric-breakdown-dialog.component";
import { DividePipe } from "./directives/divide.pipe";
import { ScrollIntoViewDirective } from "./directives/scroll-into-view/scroll-into-view.directive";
import { SafePipe } from "./pipes";
import { AddDaysPipe } from "./pipes/add-days.pipe";
import { AddWeeksPipe } from "./pipes/add-weeks.pipe";
import { CellNamePipe } from "./pipes/cell-name.pipe";
import { CommunicationTypePipe } from "./pipes/communication-type-name-pipe";
import { GradeNamePipe } from "./pipes/grade-name.pipe";
import { GradePipe } from "./pipes/grade.pipe";
import { InterventionStatusPipe } from "./pipes/intervention-status.pipe";

const INTL_DATE_INPUT_FORMAT = {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
  hourCycle: "h23",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

const MAT_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: INTL_DATE_INPUT_FORMAT,
  },
  display: {
    dateInput: INTL_DATE_INPUT_FORMAT,
    monthYearLabel: { year: "numeric", month: "short" },
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
    monthYearA11yLabel: { year: "numeric", month: "long" },
  },
};

@NgModule({
  declarations: [
    AvatarDialogComponent,
    ClassDialogComponent,
    ConfirmationDialogComponent,
    DialogComponent,
    NotAuthorizedComponent,
    PageNotFoundComponent,
    QuizComponent,
    SignaturePadComponent,
    SignatureFieldComponent,
    TabGroupComponent,
    ToolbarComponent,
    GradeLevelSelectorComponent,
    ChooseAGradeComponent,
    FDAngularRichTextWrapperComponent,

    // Pipes
    SafePipe,
    GradePipe,
    GradeNamePipe,
    DividePipe,
    AddWeeksPipe,
    AddDaysPipe,
    InterventionStatusPipe,
    CommunicationTypePipe,

    // Directives
    ScrollIntoViewDirective,
    CellNamePipe,
    EngagementMetricBreakdownDialogComponent,
  ],
  imports: [
    AngularEditorModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTableExporterModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ReactiveFormsModule,
    RouterModule,
    UiScrollModule,
    FlexLayoutModule,
  ],
  exports: [
    // Modules
    AngularEditorModule,
    CommonModule,
    FormsModule,
    LazyLoadImageModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTableExporterModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ReactiveFormsModule,
    RouterModule,
    UiScrollModule,

    // Components,
    AvatarDialogComponent,
    ClassDialogComponent,
    DialogComponent,
    PageNotFoundComponent,
    QuizComponent,
    SignatureFieldComponent,
    TabGroupComponent,
    ToolbarComponent,
    GradeLevelSelectorComponent,
    ChooseAGradeComponent,
    FDAngularRichTextWrapperComponent,

    // Pipes
    CellNamePipe,
    DividePipe,
    SafePipe,
    GradePipe,
    GradeNamePipe,
    AddWeeksPipe,
    AddDaysPipe,
    InterventionStatusPipe,
    CommunicationTypePipe,

    // Directives
    ScrollIntoViewDirective,
  ],
  providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS }],
})
export class DesignModule {}
