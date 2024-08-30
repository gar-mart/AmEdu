import { Component, OnInit } from "@angular/core";
import { StudentResource } from "@models/student-resource.model";
import { AdminService } from "@services/admin.service";
import { Constants } from "app/shared";

@Component({
  selector: "app-resources",
  templateUrl: "./resources.component.html",
  styleUrls: ["./resources.component.scss"],
})
export class ResourcesComponent implements OnInit {
  resourcesByCategoryK5: Map<string, StudentResource[]>;
  resourcesByCategory68: Map<string, StudentResource[]>;
  resourcesByCategory912: Map<string, StudentResource[]>;
  gradesK5 = Constants.gradesK5;
  grades68 = Constants.grades68;
  grades912 = Constants.grades912;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.returnStudentResources().subscribe(result => {
      this.resourcesByCategoryK5 = this.buildGradeMap(this.gradesK5, result);
      this.resourcesByCategory68 = this.buildGradeMap(this.grades68, result);
      this.resourcesByCategory912 = this.buildGradeMap(this.grades912, result);
    });
  }

  private buildGradeMap(gradeLevels: string[], result: StudentResource[]): Map<string, StudentResource[]> {
    const resourceMap = new Map<string, StudentResource[]>();

    let filtered = result.filter(resource => {
      let resourceGradeLevels = resource.studentResourceGradeLevels.map(x => x.gradeLevel);
      return gradeLevels.some(x => resourceGradeLevels.indexOf(x) !== -1);
    });

    filtered.forEach(resource => {
      if (resourceMap.has(resource.category)) {
        resourceMap.get(resource.category).push(resource);
      } else {
        resourceMap.set(resource.category, [resource]);
      }
    });

    return resourceMap;
  }
}
