import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InterventionistAdminGuard } from "@guards/interventionist-admin.guard";
import { AuthenticationGuard } from "../../guards";
import { InterventionsEmailTemplateComponent } from "./components/interventions-email-templates/components/interventions-email-template.component";
import { InterventionsEmailTemplatesComponent } from "./components/interventions-email-templates/interventions-email-templates.component";
import { InterventionsReportComponent } from "./components/interventions-report/interventions-report.component";
import { InterventionsStudentComponent } from "./components/interventions-student/interventions-student.component";

const mentorRoutes: Routes = [
  {
    path: "",
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: "report",
        component: InterventionsReportComponent,
      },
      {
        path: "student",
        component: InterventionsStudentComponent,
      },
      {
        path: "email-templates",
        canActivate: [InterventionistAdminGuard],
        children: [
          {
            path: "",
            component: InterventionsEmailTemplatesComponent,
          },
          {
            path: ":level",
            component: InterventionsEmailTemplateComponent,
          },
        ],
      },
      {
        path: "",
        redirectTo: "report",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mentorRoutes)],
  exports: [RouterModule],
})
export class InterventionsRoutingModule {}
