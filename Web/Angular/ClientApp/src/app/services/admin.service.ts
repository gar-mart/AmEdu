import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Elective } from "@models/elective";
import { ElectiveGroup } from "@models/elective-group";
import { ElectiveGroupChoice } from "@models/elective-group-choice";
import { ShortcutContentModel, StudentResourceContent } from "@models/step-content.model";
import { StudentResource } from "@models/student-resource.model";
import { AppTileMetadata, Break, ElectiveSetting, Enrollment, InterventionThreshold, Staff } from "app/models";
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

  returnAppShortcuts(): Observable<AppTileMetadata[]> {
    return this.get<AppTileMetadata[]>("returnAppTiles");
  }

  // Posts
  createBreak(item: Break): Observable<number> {
    return this.post<number>(`createBreak`, item);
  }

  uploadEnrollmentImportData(file: File): Observable<Enrollment[]> {
    return this.post<Enrollment[]>("uploadEnrollmentImportData", file);
  }

  addAppTileMetadata(appTile: AppTileMetadata): Observable<number> {
    return this.post<number>("addAppTileMetadata", appTile);
  }

  // Puts
  updateInterventionThreshold(item: InterventionThreshold): Observable<boolean> {
    return this.put<boolean>(`updateInterventionThreshold`, item);
  }

  updateEnrollments(items: Enrollment[]): Observable<boolean> {
    return this.put<boolean>(`updateEnrollments`, items);
  }

  updateAppTileMetadata(appTile: AppTileMetadata): Observable<AppTileMetadata> {
    return this.put<AppTileMetadata>(`updateAppTileMetadata`, appTile);
  }

  uploadAppTileMetadataImage(id: number, file: File) {
    return this.put<boolean>(`uploadAppTileImage/${id}`, file);
  }

  updateAppTileGradeLevels(appTile: AppTileMetadata): Observable<AppTileMetadata> {
    return this.put<AppTileMetadata>(`updateAppTileGradeLevels`, appTile);
  }

  updateStaffMember(staff: Staff): Observable<boolean> {
    return this.put<boolean>("updateStaffMember", staff);
  }

  // Deletes
  deleteBreak(id: number): Observable<boolean> {
    return this.delete<boolean>(`deleteBreak/${id}`);
  }

  //StudentResources
  returnStudentResources(): Observable<StudentResource[]> {
    return this.get<StudentResource[]>("returnStudentResources");
  }

  addStudentResource(studentResource: StudentResource): Observable<number> {
    return this.post<number>("addStudentResource", studentResource);
  }

  updateStudentResource(studentResource: StudentResource): Observable<StudentResource> {
    return this.put<StudentResource>(`updateStudentResource`, studentResource);
  }

  updateStudentResourceGradeLevels(studentResource: StudentResource): Observable<StudentResource> {
    return this.post<StudentResource>(`updateStudentResourceGradeLevels`, studentResource);
  }

  deleteStudentResource(id: number): Observable<boolean> {
    return this.delete<boolean>(`deleteStudentResource/${id}`);
  }

  deleteAppShortcut(id: number): Observable<boolean> {
    return this.delete<boolean>(`deleteAppTileMetadata/${id}`);
  }

  deleteElectiveGroupChoice(electiveGroupChoice: ElectiveGroupChoice) {
    return this.delete<boolean>(`deleteElectiveGroupChoice/${electiveGroupChoice.id}`);
  }

  deleteElectiveGroup(electiveGroup: ElectiveGroup) {
    return this.delete<boolean>(`deleteElectiveGroup/${electiveGroup.id}`);
  }

  createElectiveGroup(electiveGroup: ElectiveGroup) {
    return this.post<ElectiveGroup>(`createElectiveGroup`, electiveGroup);
  }

  createElectiveGroupChoice(electiveGroupChoice: ElectiveGroupChoice) {
    return this.post<ElectiveGroupChoice>(`CreateElectiveGroupChoice`, electiveGroupChoice);
  }

  updateElectiveGroup(electiveGroup: ElectiveGroup) {
    return this.put<ElectiveGroup>(`updateElectiveGroup`, electiveGroup);
  }

  //Electives

  addElective(elective: Elective): Observable<number> {
    return this.post<number>("addElective", elective);
  }

  updateElective(elective: Elective): Observable<Elective> {
    return this.put<Elective>(`updateElective`, elective);
  }

  deleteElective(id: number): Observable<boolean> {
    return this.delete<boolean>(`deleteElective/${id}`);
  }

  updateElectiveSettings(electiveSettings: ElectiveSetting[]): Observable<ElectiveSetting[]> {
    return this.put<ElectiveSetting[]>(`updateElectiveSettings`, electiveSettings);
  }

  returnAppShortcutsBySearch(searchTerm: string): Observable<AppTileMetadata[]> {
    return this.get<AppTileMetadata[]>(`returnAppTileMetadataBySearch`, { searchTerm: searchTerm });
  }

  addAppTileMetadataContent(shortcutContentModel: ShortcutContentModel) {
    return this.post<ShortcutContentModel>("addAppTileMetadataContent", shortcutContentModel);
  }

  returnStudentResourcesBySearch(searchTerm: string): Observable<StudentResource[]> {
    return this.get<StudentResource[]>(`returnStudentResourcesBySearch`, { searchTerm: searchTerm });
  }

  addStudentResourcesContent(studentResourceContent: StudentResourceContent) {
    return this.post<ShortcutContentModel>("addStudentResourceContent", studentResourceContent);
  }
}
