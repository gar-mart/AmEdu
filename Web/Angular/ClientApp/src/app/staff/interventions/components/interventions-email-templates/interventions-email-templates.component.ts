import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { InterventionEmailTemplate } from "@models/intervention-email-template.model";
import { InterventionService } from "../../interventions.service";

@Component({
  selector: "app-interventions-email-templates",
  templateUrl: "./interventions-email-templates.component.html",
  styleUrls: ["./interventions-email-templates.component.scss"],
})
export class InterventionsEmailTemplatesComponent implements OnInit {
  readonly displayedColumns = ["actions", "interventionLevel", "emailFrom", "emailTo"];

  dataSource = new MatTableDataSource();

  constructor(
    private router: Router,
    private interventionService: InterventionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.interventionService.returnInterventionEmailTemplates().subscribe(emailTemplates => {
      this.dataSource = new MatTableDataSource(emailTemplates);
    });
  }

  editEmailTemplate(emailTemplate: InterventionEmailTemplate) {
    this.router.navigate([emailTemplate.interventionLevel], { relativeTo: this.route });
  }
}
