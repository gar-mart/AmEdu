import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StudentInformation } from "app/models";
import { Observable } from "rxjs";
import { ApiService } from "../shared";

@Injectable({ providedIn: "root" })
export class StudentService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "student");
  }

  returnStudentInformationById(studentId: number): Observable<StudentInformation> {
    return this.get<StudentInformation>(`returnStudentInformationById/${studentId}`);
  }

  updateStudentInformation(item: StudentInformation): Observable<boolean> {
    return this.put<boolean>("updateStudentInformation", item);
  }
}
