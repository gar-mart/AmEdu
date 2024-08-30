import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AppComponent } from "app/app.component";
import { Student } from "app/models";
import { UserDtoInterface } from "app/modules/account/models/user-dto.model";
import { Constants, Utility } from "app/shared";
import { convertDataUriToFile } from "app/shared/images";
import { environment } from "environments/environment";
import { saveAs } from "file-saver";
import * as JSZip from "jszip";
import { Subscription } from "rxjs";
import { ReportsService } from "../../services";

@Component({
  selector: "app-student-picture-report",
  templateUrl: "./student-picture-report.component.html",
  styleUrls: ["./student-picture-report.component.scss"],
})
export class StudentPictureReportComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private readonly subscriptions: Subscription[] = [];

  readonly environment = environment;
  readonly Utility = Utility;
  readonly gradeLevels: string[] = Constants.grades;
  readonly displayedColumns: string[] = ["name"];
  readonly pageSizes = [10, 50, 100];

  gradeLevelFilter = new UntypedFormControl();
  schoolFilter = new UntypedFormControl();
  imageFormat = new UntypedFormControl();
  downloadButton = new UntypedFormControl();

  user: UserDtoInterface;
  students: Student[];

  dataSource = new MatTableDataSource();
  noResultsMessage = "Loading...";
  downloading = false;

  constructor(private appComponent: AppComponent, private reportsService: ReportsService) {}

  ngOnInit() {
    // set default filter values
    this.gradeLevelFilter.patchValue("All");
    this.schoolFilter.patchValue("AmEdustudents.org");
    this.imageFormat.patchValue("image/jpg");

    // set up value changes events
    this.subscriptions.push(
      this.gradeLevelFilter.valueChanges.subscribe(this.filterStudents.bind(this)),
      this.schoolFilter.valueChanges.subscribe(this.filterStudents.bind(this))
    );

    this.loadDatatable(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  downloadPictures() {
    const grade = this.gradeLevelFilter.value;
    const school = this.schoolFilter.value;
    const imageFormat = this.imageFormat.value;
    this.gradeLevelFilter.disable();
    this.schoolFilter.disable();
    this.imageFormat.disable();

    this.appComponent.isBusy = this.downloading = true;
    this.reportsService
      .returnStudentPictureReport(true)
      .subscribe(result => {
        const jszip = new JSZip();

        const promises = result
          .filter(s => this.filterStudent(s, grade, school))
          .filter(({ studentPicture }) => !!studentPicture)
          .map(({ name, studentPicture }) =>
            convertDataUriToFile(studentPicture, imageFormat, `${name}.${imageFormat.split("/")[1]}`)
          );

        Promise.all(promises).then(images => {
          images.forEach(file => {
            jszip.file(file.name, file);
          });
          jszip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "StudentPictures.zip");
          });
        });
      })
      .add(() => {
        this.appComponent.isBusy = this.downloading = false;
        this.gradeLevelFilter.enable();
        this.imageFormat.enable();
        this.schoolFilter.enable();
      });
  }

  private loadDatatable(initializing?: boolean) {
    this.appComponent.isBusy = initializing !== true;

    this.reportsService.returnStudentPictureReport().subscribe(students => {
      this.students = students;
      this.user = this.reportsService.user;
      this.filterStudents();
      this.appComponent.isBusy = false;
    });
  }

  private filterStudents() {
    this.dataSource = new MatTableDataSource(
      this.students?.filter(
        student => this.filterStudent(student, this.gradeLevelFilter.value, this.schoolFilter.value) ?? []
      )
    );
    this.noResultsMessage = "No students found. Adjust your filters.";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private filterStudent(student: Student, grade: string, school: string): boolean {
    if (grade && grade !== "All") {
      if (student.gradeLevel !== grade) {
        return false;
      }
    }

    if (school && school !== "All") {
      if (!student.studentEmail.toLowerCase().endsWith(school)) {
        return false;
      }
    }

    return true;
  }
}
