import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Attachment } from "@models/attachment.model";
import { InterventionEmailCommunication } from "@models/intervention-email-communication.model";
import { InterventionScheduledMeeting } from "@models/intervention-scheduled-meeting.model";
import { InterventionSuccessPlan } from "@models/intervention-success-plan.model";
import { InterventionTruancyForm } from "@models/intervention-truancy-form.model";
import { Intervention } from "@models/intervention.model";
import { StudentIntervention } from "@models/student-intervention.model";
import { Student } from "@models/student.model";
import { InterventionLevel } from "app/enums/intervention-level.enum";
import { InterventionStatus } from "app/enums/intervention-status.enum";
import { forkJoin, Observable, of } from "rxjs";
import { InterventionEmailTemplate } from "../../models/intervention-email-template.model";
import { ApiService, Utility } from "../../shared";

@Injectable({ providedIn: "root" })
export class InterventionService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "intervention");
  }

  returnInterventionEmailTemplateByInterventionId(interventionId: number): Observable<InterventionEmailTemplate> {
    return this.get<InterventionEmailTemplate>(`returnInterventionEmailTemplateByInterventionId/${interventionId}`);
  }

  returnInterventionEmailTemplates(): Observable<InterventionEmailTemplate[]> {
    return this.get<InterventionEmailTemplate[]>("returnInterventionEmailTemplates");
  }

  updateInterventionEmailTemplateAttachments(interventionLevel: InterventionLevel, files: File[]) {
    files = files.filter(f => f.size > 0);

    if (!files.length) {
      return of([true]);
    }

    return forkJoin(
      files.map(file => this.put<boolean>(`updateInterventionEmailTemplateAttachment/${interventionLevel}`, file))
    );
  }

  updateInterventionEmailTemplate(interventionEmailTemplate: InterventionEmailTemplate): Observable<boolean> {
    return this.put<boolean>(`updateInterventionEmailTemplate`, interventionEmailTemplate);
  }

  getInterventionsBySearch(schoolYear: number | Date, studentId: number = 0): Observable<Intervention[]> {
    return this.get<Intervention[]>(
      `getInterventionsBySearch/${studentId}/${
        schoolYear instanceof Date ? Utility.getDateQueryFormat(schoolYear) : schoolYear
      }`
    );
  }

  getStudentsWithInterventions(includeStudentId: number = null) {
    return this.get<Student[]>(`getStudentsWithInterventions/${includeStudentId || ""}`);
  }

  getInterventionLevelsBySearch(schoolYear: number | Date, enrollmentStatus: boolean) {
    return this.get<StudentIntervention[]>(
      `getInterventionLevelsBySearch/${
        schoolYear instanceof Date ? Utility.getDateQueryFormat(schoolYear) : schoolYear
      }?enrollmentStatus=${typeof enrollmentStatus === "boolean" ? enrollmentStatus : ""}`
    );
  }

  updateEmailCommunication(item: InterventionEmailCommunication) {
    return this.put<Intervention>("updateEmailCommunication", item);
  }

  uploadEmailCommunicationAttachment(id: number, file: File) {
    return this.put<string>(`uploadEmailCommunicationAttachment/${id}`, file);
  }

  deleteEmailCommunicationAttachment(id: number, attachment: Attachment) {
    return this.delete<void>(`deleteEmailCommunicationAttachment/${id}/${encodeURIComponent(attachment.fileName)}`);
  }

  updateScheduledMeeting(item: InterventionScheduledMeeting) {
    if (item.dateOfMeeting) {
      item.dateOfMeeting = Utility.getDateQueryFormat(new Date(item.dateOfMeeting));
    }

    return this.put<Intervention>("updateScheduledMeeting", item);
  }

  uploadScheduledMeetingAttachment(id: number, file: File) {
    return this.put<string>(`uploadScheduledMeetingAttachment/${id}`, file);
  }

  deleteScheduledMeetingAttachment(id: number, attachment: Attachment) {
    return this.delete<void>(`deleteScheduledMeetingAttachment/${id}/${encodeURIComponent(attachment.fileName)}`);
  }

  updateSuccessPlan(item: InterventionSuccessPlan) {
    if (item.successPlanCreatedDate) {
      item.successPlanCreatedDate = Utility.getDateQueryFormat(new Date(item.successPlanCreatedDate));
    }

    return this.put<Intervention>("updateSuccessPlan", item);
  }

  uploadSuccessPlanAttachment(id: number, file: File) {
    return this.put<string>(`uploadSuccessPlanAttachment/${id}`, file);
  }

  deleteSuccessPlanAttachment(id: number, attachment: Attachment) {
    return this.delete<void>(`deleteSuccessPlanAttachment/${id}/${encodeURIComponent(attachment.fileName)}`);
  }

  updateTruancyForm(item: InterventionTruancyForm) {
    return this.put<Intervention>("updateTruancyForm", item);
  }

  uploadTruancyFormAttachment(id: number, file: File) {
    return this.put<string>(`uploadTruancyFormAttachment/${id}`, file);
  }

  deleteTruancyFormAttachment(id: number, attachment: Attachment) {
    return this.delete<void>(`deleteTruancyFormAttachment/${id}/${encodeURIComponent(attachment.fileName)}`);
  }

  setInterventionStatus(id: number, status: InterventionStatus) {
    return this.put<Intervention>(`setInterventionStatus/${id}/${status}`);
  }

  deleteIntervention(id: number) {
    return this.delete<void>(`deleteIntervention/${id}`);
  }
}
