import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Elective } from "@models/elective";
import { Break, Enrollment, InterventionThreshold } from "app/models";
import { ApiService } from "app/shared";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AdminService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "admin");
  }

  // Gets
  returnBreaks(year: number): Observable<Break[]> {
    return this.get<Break[]>(`returnBreaks/${year}`);
  }

  returnInterventionThresholds(): Observable<InterventionThreshold[]> {
    return this.get<InterventionThreshold[]>(`returnInterventionThresholds`);
  }

  // Posts
  createBreak(item: Break): Observable<number> {
    return this.post<number>(`createBreak`, item);
  }

  uploadEnrollmentImportData(file: File): Observable<Enrollment[]> {
    return this.post<Enrollment[]>("uploadEnrollmentImportData", file);
  }

  // Puts
  updateInterventionThreshold(item: InterventionThreshold): Observable<boolean> {
    return this.put<boolean>(`updateInterventionThreshold`, item);
  }

  updateEnrollments(items: Enrollment[]): Observable<boolean> {
    return this.put<boolean>(`updateEnrollments`, items);
  }

  // Deletes
  deleteBreak(id: number): Observable<boolean> {
    return this.delete<boolean>(`deleteBreak/${id}`);
  }

  //Electives
  returnElectives(): Observable<Elective[]> {
    return this.get<Elective[]>(`returnElectives`);
  }
}
