import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EngagementReport, OrientationReprt, Student, Tardiness } from "app/models";
import { ApiService, Utility } from "app/shared";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: "root" })
export class ReportsService extends ApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getOrientationReportData(): Observable<OrientationReprt> {
    return this.get<OrientationReprt>(`orientation/returnOrientationReportData`);
  }

  exportOrientationReportExcel(student: string, elective: string, grade: string, email: string): Observable<any> {
    student ??= " ";
    elective ??= " ";
    return this.http.get(
      `${environment.apiUrl}/orientation/ExportOrientationReportExcel/${grade}/${email}/${student}/${elective}`,
      {
        responseType: "blob",
      }
    );
  }

  getEnrollmentReport(gradeLevel: string, school: string, startDate: Date, endDate: Date, studentIds: number[]) {
    const query = studentIds.map(id => "studentIds=" + id).join("&");
    return this.http.get(
      `${environment.apiUrl}/staff/downloadEnrollmentReport/${gradeLevel}/${school}/${Utility.getDateQueryFormat(
        startDate
      )}/${Utility.getDateQueryFormat(endDate)}?${query}`,
      {
        responseType: "blob",
        observe: "response",
      }
    );
  }

  returnEngagementReport(
    startDate: Date,
    endDate: Date,
    page: number,
    perPage: number,
    studentName: string,
    gradeLevel: string,
    enrollmentStatus: -1 | boolean | string,
    myStudents: boolean,
    school: string,
    sortBy: string,
    sortDirection: string
  ) {
    // AmEdu wants to see dates from Monday to Sunday, but the backend logic is written to omit the end date, so we need to adjust the date by one
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

    if (!studentName) {
      studentName = ""; // don't pass "undefined" or "null" for falsey values
    }

    if (enrollmentStatus === -1) {
      enrollmentStatus = "";
    }

    return this.get<{ items: EngagementReport[]; total: number }>(
      `/staff/returnEngagementReport/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}/${page}/${perPage}?studentName=${studentName}&gradeLevel=${gradeLevel}&enrollmentStatus=${enrollmentStatus}&myStudents=${myStudents}&school=${school}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );
  }

  exportEngagementReportPdf(startDate: Date, endDate: Date, studentId: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/staff/exportEngagementReportPdf/${Utility.getDateQueryFormat(
        startDate
      )}/${Utility.getDateQueryFormat(endDate)}/${studentId}`,
      {
        responseType: "blob",
      }
    );
  }

  exportEngagementReportExcel(startDate: Date, endDate: Date, studentId: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/staff/exportEngagementReportExcel/${Utility.getDateQueryFormat(
        startDate
      )}/${Utility.getDateQueryFormat(endDate)}/${studentId}`,
      {
        responseType: "blob",
      }
    );
  }

  returnTardies(studentId: number, startDate: Date, endDate: Date): Observable<Tardiness[]> {
    return this.get<Tardiness[]>(
      `staff/returnTardies/${studentId}/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(endDate)}`
    );
  }

  returnStudentPictureReport(includePictures: boolean = false): Observable<Student[]> {
    return this.get<Student[]>(`staff/returnStudentPictureReport/${includePictures}`);
  }
}
