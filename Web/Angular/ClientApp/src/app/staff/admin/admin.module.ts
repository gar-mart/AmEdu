import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonService } from "@services/common.service";
import { DesignModule } from "app/design";
import { AdminRoutingModule } from "./admin-routing.module";
import {
  AppShortcutDialogComponent,
  AppShortcutsComponent,
  AssignStudentsToMentorDialogComponent,
  BreaksComponent,
  ElectiveDialogComponent,
  ElectiveGroupChoiceComponent,
  EnrollmentImportComponent,
  InterventionThresholdDialogComponent,
  InterventionThresholdsComponent,
  ManageElectivesComponent,
  ManageStaffComponent,
  ManageStudentResourcesComponent,
  ManageStudentResourcesDialogComponent,
  ManageStudentsComponent,
  ViewMenteesDialogComponent,
} from "./components";
import { CommunityPassportFormsComponent } from "./components/manage-electives/community-passport-forms/community-passport-forms.component";
import { EditStaffDialogComponent } from "./components/manage-staff/components/edit-staff-dialog/edit-staff-dialog.component";

@NgModule({
  declarations: [
    AssignStudentsToMentorDialogComponent,
    BreaksComponent,
    EnrollmentImportComponent,
    InterventionThresholdsComponent,
    InterventionThresholdDialogComponent,
    ManageStaffComponent,
    ManageStudentsComponent,
    ViewMenteesDialogComponent,
    AppShortcutsComponent,
    AppShortcutDialogComponent,
    ManageStudentResourcesComponent,
    ManageStudentResourcesDialogComponent,
    ManageElectivesComponent,
    ElectiveDialogComponent,
    BreaksComponent,
    ViewMenteesDialogComponent,
    ElectiveGroupChoiceComponent,
    EditStaffDialogComponent,
    CommunityPassportFormsComponent,
  ],
  imports: [AdminRoutingModule, DesignModule, CommonModule, FlexLayoutModule],
  providers: [CommonService],
})
export class AdminModule {}
