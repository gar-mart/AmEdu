import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonService } from "@services/common.service";
import { AppComponent } from "app/app.component";
import { Student } from "app/models";
import { ReportsService } from "app/staff/reports/services";
import { environment } from "environments/environment";

@Component({
  selector: "app-enrollment-report",
  templateUrl: "./enrollment-report.component.html",
  styleUrls: ["./enrollment-report.component.scss"],
})
export class EnrollmentReportComponent implements OnInit {
  maxDate = new Date();

  Object = Object;
  environment = environment;

  form: UntypedFormGroup;

  gradeLevels: string[];
  schools: { [value: string]: string };
  allStudents: Student[] = null;

  filterByGrade = true;
  isDownloading = false;

  constructor(
    private reportsService: ReportsService,
    private commonService: CommonService,
    private formBuilder: UntypedFormBuilder,
    public appComponent: AppComponent,
    private snackBar: MatSnackBar
  ) {
    this.gradeLevels = ["All", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    this.schools = {
      All: "All",
      "AmEdustudents.org": "AmEdu",
      "innocademystudents.com": "Innocademy",
    };

    this.form = this.formBuilder.group(
      {
        gradeLevel: ["All", Validators.required],
        school: ["All", Validators.required],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        students: [[]],
      },
      {
        validators: form => {
          // validate that startDate <= endDate
          const startDate = form.get("startDate").value;
          const endDate = form.get("endDate").value;

          return startDate === null || endDate === null || startDate <= endDate ? null : { range: true };
        },
      }
    );
  }

  ngOnInit(): void {
    this.commonService.getAllStudents().subscribe(students => (this.allStudents = students));
  }

  downloadReport() {
    const startDate: Date = this.form.get("startDate").value;
    const endDate: Date = this.form.get("endDate").value;

    let gradeLevel: string = this.form.get("gradeLevel").value;
    let school: string = this.form.get("school").value;
    let students: Student[] = this.form.get("students").value;

    // users can choose one of two types of filters, so apply the default in the opposite selection
    if (this.filterByGrade) {
      students = [];
    } else {
      gradeLevel = "All";
      school = "All";
    }

    this.appComponent.isBusy = this.isDownloading = true;
    this.reportsService
      .getEnrollmentReport(
        gradeLevel,
        school,
        startDate,
        endDate,
        students.map(s => s.id)
      )
      .subscribe(
        response => {
          // convert the encoded CSV file into a Blob
          const file = new Blob([response.body]);

          // use an HTMLAnchorElement to open the csv file
          const fileAnchor = document.createElement("a");
          fileAnchor.download = response.headers
            .get("content-disposition")
            .split("; ")
            .find(x => x.startsWith("filename="))
            .replace('filename="', "")
            .replace('"', "")
            .replace(";", "");
          fileAnchor.href = URL.createObjectURL(file);
          fileAnchor.click();
        },
        (e: HttpErrorResponse) => {
          console.error(e);
          if (e.status === 400) {
            this.snackBar.open(e.error, "Close", { panelClass: "success" });
          }
        }
      )
      .add(() => {
        // finally
        this.appComponent.isBusy = this.isDownloading = false;
      });
  }
}
