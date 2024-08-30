import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Class, ClassUser, LiveLessonPoints, Tardiness } from "app/models";
import { ApiService, Utility } from "app/shared";
import { Observable } from "rxjs";
import { Absence } from "../../../models/absence";

@Injectable({ providedIn: "root" })
export class TeacherService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "teacher");
  }

  // Gets
  returnClasses(date: Date, searchTerm?: string): Observable<Class[]> {
    const query = `${Utility.getDateQueryFormat(date)}${
      searchTerm ? `?searchTerm=${encodeURIComponent(searchTerm)}` : ""
    }`;
    return this.get<Class[]>(`returnClasses/${query}`);
  }

  returnClassUsers(classId: number, date: Date): Observable<ClassUser[]> {
    return this.get<ClassUser[]>(`returnClassUsers/${classId}/${Utility.getDateQueryFormat(date)}`);
  }

  returnAbsences(studentId: number, startDate: Date, endDate: Date): Observable<Absence[]> {
    if (!startDate) {
      startDate = new Date("2000-1-1");
    }
    if (!endDate) {
      endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    return this.get<Absence[]>(
      `returnAbsences/${studentId}/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(endDate)}`
    );
  }

  // Puts
  updateLiveLessonPoints(item: LiveLessonPoints, users: number[]): Observable<boolean> {
    const model = Object.assign({}, { users }, item);
    return this.put<boolean>(`updateLiveLessonPoints`, model);
  }

  updateTardiness(item: Tardiness): Observable<boolean> {
    return this.put<boolean>("updateTardiness", item);
  }

  updateAbsence(item: Absence): Observable<boolean | number> {
    return this.put<boolean>("updateAbsence", item);
  }

  // Posts
  createAbsence(item: Absence): Observable<number> {
    return this.post<number>(`createAbsence`, item);
  }

  // Deletes
  deleteAbsence(id: number): Observable<boolean> {
    return this.delete<boolean>(`deleteAbsence/${id}`);
  }
}
