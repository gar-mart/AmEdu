import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Elective } from "@models/elective";
import { ElectiveGroup } from "@models/elective-group";
import { StudentResource } from "@models/student-resource.model";
import { AppTileMetadata, ClassUser, ElectiveSetting, Staff, Student, User } from "app/models";
import { ApiService, Utility } from "app/shared";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CommonService extends ApiService {
  constructor(http: HttpClient, private httpBackend: HttpBackend) {
    super(http, "common");
  }

  /* #region Http Gets */

  getAllStudents(): Observable<Student[]> {
    return this.get<Student[]>(`returnAllStudents`);
  }

  getAllStaff(): Observable<Staff[]> {
    return this.get<Staff[]>(`returnAllStaff`);
  }

  getMentors(hasMentees: boolean = null): Observable<Staff[]> {
    return this.get<Staff[]>(`returnMentors/${hasMentees === null ? "" : hasMentees}`);
  }

  getCounselors(gradeLevel: string = null): Observable<Staff[]> {
    return this.get<Staff[]>(`returnCounselors/${gradeLevel || ""}`);
  }

  getStudentsByMentor(mentorId: number): Observable<Student[]> {
    return this.get<Student[]>(`returnStudentsByMentor/${mentorId}`);
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.get<Student>(`returnStudentById/${studentId}`);
  }

  getEnvironment(): Observable<string> {
    return this.http
      .get<string>(this.apiUrl + "returnEnvironment", { responseType: "text" as "json" })
      .pipe(catchError(error => throwError(error)));
  }

  returnClassUsersByStudentId(studentId: number, startDate?: Date, endDate?: Date): Observable<ClassUser[]> {
    if (!startDate) {
      startDate = Utility.getBeginningOfWeek();
    }
    if (!endDate) {
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7);
    }
    return this.get<ClassUser[]>(
      `returnClassUsersByStudentId/${studentId}/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}`
    );
  }

  returnElectivesBySearch(searchTerm = "") {
    return this.get<Elective[]>(`returnElectivesBySearch`, { searchTerm: searchTerm });
  }

  returnElectives(): Observable<Elective[]> {
    return this.get<Elective[]>(`returnElectives`);
  }

  returnElectiveGroups(): Observable<ElectiveGroup[]> {
    return this.get<ElectiveGroup[]>("returnElectiveGroups");
  }

  returnElectiveSettings(): Observable<ElectiveSetting[]> {
    return this.get<ElectiveSetting[]>(`returnElectiveSettings`);
  }

  /* #endregion */

  /* #region Http Posts */

  assignMentorToStudent(studentId: number, mentorId: number): Observable<boolean> {
    const item = { studentId: studentId, mentorId: mentorId };
    return this.post<boolean>(`assignMentorToStudent`, item);
  }

  setAdmin(userId: number, isAdmin: boolean): Observable<boolean> {
    const item: User = { id: userId, isAdmin };
    return this.post<boolean>(`setAdmin`, item);
  }

  setTeacher(userId: number, isTeacher: boolean): Observable<boolean> {
    const item: User = { id: userId, isTeacher };
    return this.post<boolean>(`setTeacher`, item);
  }

  setReFuelCoordinator(userId: number, isReFuelCoordinator: boolean): Observable<boolean> {
    const item: User = { id: userId, isReFuelCoordinator };
    return this.post<boolean>(`setRefuelCoordinator`, item);
  }

  setInterventionist(userId: number, isInterventionist: boolean): Observable<boolean> {
    const item: User = { id: userId, isInterventionist };
    return this.post<boolean>(`setInterventionist`, item);
  }

  assignStudentsToMentor(mentorId: number, studentList: number[]): Observable<boolean> {
    const item = { mentorId: mentorId, studentList };
    return this.post<boolean>(`assignStudentsToMentor`, item);
  }

  setStudentGradeLevel(userId: number, gradeLevel: string): Observable<number> {
    const item = { userId: userId, gradeLevel };
    return this.post<number>(`setStudentGradeLevel`, item);
  }

  sendMessageToMentor(student: Student, message: string, isSecondaryMentor: boolean): Observable<boolean> {
    const item = { student, message, isSecondaryMentor };
    return this.post<boolean>(`sendMessageToMentor`, item);
  }

  sendErrorEmail(item): Observable<boolean> {
    return this.post<boolean>(`SendErrorEmail`, item);
  }

  assignSecondaryMentorToStudent(studentId: number, mentorId: number): Observable<boolean> {
    const item = { studentId: studentId, mentorId: mentorId };
    return this.post<boolean>(`assignSecondaryMentorToStudent`, item);
  }

  unsubscribeFromWeeklySnapshotEmail(studentGoogleId: string): Observable<boolean> {
    return this.post<boolean>(
      "unsubscribeFromWeeklySnapshotEmail",
      { studentGoogleId },
      new HttpClient(this.httpBackend)
    );
  }

  /* #endregion */

  /* Region Shared Methods */

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  /* #endregion */

  returnStaffBySearch(searchTerm = ""): Observable<User[]> {
    return this.get<User[]>(`returnStaffBySearch`, { searchTerm: searchTerm });
  }

  returnUserById(id: number): Observable<User> {
    return this.get<User>(`returnUserById/${id}`);
  }

  returnStudentResourceById(id: number): Observable<StudentResource> {
    return this.get<StudentResource>(`returnStudentResourceById/${id}`);
  }

  returnAppShortcutById(id: number): Observable<AppTileMetadata> {
    return this.get<AppTileMetadata>(`returnAppTileMetadataById/${id}`);
  }
}
