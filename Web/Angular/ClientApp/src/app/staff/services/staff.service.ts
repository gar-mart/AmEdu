import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommunityPassportForm } from "@models/community-passport-form.model";
import { EngagementFlagReportItem } from "@models/engagement-flag-report-item";
import { EngagementMetricItem } from "@models/engagement-metric.model";
import { Intervention } from "@models/intervention.model";
import { PagePointSource } from "app/enums/page-point-source.enum";
import {
  Communication,
  CommunicationList,
  CommunicationListEntry,
  EngagementFlag,
  EngagementReport,
  Points,
  QuoteOfTheDay,
  StudentSearchInformation,
} from "app/models";
import { ApiService, Utility } from "app/shared";
import { Observable } from "rxjs";
import { CashOutPointsItem } from "../../models/cash-out-points-item.model";
import { EmailTemplate } from "../../models/email-template.model";
import { EngagementFlagResponsesReportItem } from "../../models/engagement-flag-responses-report-item";
import { FlaggedStudentReportItem } from "../../models/flagged-student-report-item";
import { FlagsGeneratedReportItem } from "../../models/flags-generated-report-item";
import { PointDetailReportItem } from "../../models/point-detail-report-item";
import { PointSourcePageReportItem } from "../../models/point-source-page-report-item";
import { PointSourceStaffReportItem } from "../../models/point-source-staff-report-item";
import { PointTypeAwardReportItem } from "../../models/point-type-award-report-item";
import { CommunicationFilter } from "../components/emailing/communication-filter/communication.filter";

@Injectable({ providedIn: "root" })
export class StaffService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "staff");
  }

  // Gets
  returnEngagementMetricData(payload: {
    studentId: number;
    metric: keyof EngagementReport;
    startDate: Date;
    endDate: Date;
  }) {
    const params = [
      payload.studentId,
      payload.metric,
      Utility.getDateQueryFormat(payload.startDate),
      Utility.getDateQueryFormat(payload.endDate),
    ];

    return this.get<EngagementMetricItem>(`returnEngagementMetricData/${params.join("/")}`);
  }

  returnStudentSearchInformation(): Observable<StudentSearchInformation[]> {
    return this.get<StudentSearchInformation[]>("returnStudentSearchInformation");
  }

  returnStudentSearchInformationByStudentId(studentId: number): Observable<StudentSearchInformation> {
    return this.get<StudentSearchInformation>(`returnStudentSearchInformationByStudentId/${studentId}`);
  }

  returnQuotesOfTheDay(): Observable<QuoteOfTheDay[]> {
    return this.get<QuoteOfTheDay[]>(`returnQuotesOfTheDay/${Utility.getDateQueryFormat()}`);
  }

  returnCommunications(studentId: number, startDate: Date, endDate: Date): Observable<Communication[]> {
    if (!startDate) {
      startDate = new Date("2000-1-1");
    }
    if (!endDate) {
      endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    return this.get<Communication[]>(
      `returnCommunications/${studentId}/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}`
    );
  }

  returnPoints(studentId: number, startDate: Date, endDate: Date): Observable<Points[]> {
    if (!startDate) {
      startDate = new Date("2000-1-1");
    }
    if (!endDate) {
      endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    return this.get<Points[]>(
      `returnPoints/${studentId}/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(endDate)}`
    );
  }

  returnEngagementFlagNotifications(): Observable<EngagementFlag[]> {
    return this.get<EngagementFlag[]>(`returnEngagementFlagNotifications`);
  }

  returnCommunicationLists(): Observable<CommunicationList[]> {
    return this.get<CommunicationList[]>(`returnCommunicationLists`);
  }

  returnCommunicationList(id: number): Observable<CommunicationList> {
    return this.get<CommunicationList>(`returnCommunicationList/${id}`);
  }

  /** Returns email templates for the signed-in user */
  returnEmailTemplates(): Observable<EmailTemplate[]> {
    return this.get<EmailTemplate[]>(`returnEmailTemplates`);
  }

  returnEngagementFlagReportItems(schoolYear: Date, enrollmentStatus: boolean): Observable<EngagementFlagReportItem[]> {
    return this.get<EngagementFlagReportItem[]>(
      `returnEngagementFlagReport/${Utility.getDateQueryFormat(schoolYear)}?enrollmentStatus=${
        typeof enrollmentStatus === "boolean" ? enrollmentStatus : ""
      }`
    );
  }

  returnOutstandingEngagementFlagReportItems(startDate: Date, endDate: Date): Observable<EngagementFlagReportItem[]> {
    return this.get<EngagementFlagReportItem[]>(
      `returnOutstandingEngagementFlagReport/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}`
    );
  }

  returnPointBalances(gradeLevels: string[]): Observable<CashOutPointsItem[]> {
    return this.get<CashOutPointsItem[]>(`returnPointBalances?${gradeLevels.map(x => "gradeLevels=" + x).join("&")}`);
  }

  returnRejectedEngagementFlagReportItems(startDate: Date, endDate: Date): Observable<EngagementFlagReportItem[]> {
    return this.get<EngagementFlagReportItem[]>(
      `returnRejectedEngagementFlagReport/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}`
    );
  }

  returnFlagResponsesReport(
    startDate: Date,
    endDate: Date,
    chartGroupingFilter: string,
    schoolFilter: string,
    mentorFilter: string
  ): Observable<EngagementFlagResponsesReportItem[]> {
    return this.get<EngagementFlagResponsesReportItem[]>(
      `returnFlagResponsesReport/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}/${chartGroupingFilter}/${schoolFilter}/${mentorFilter}`
    );
  }

  returnPointSourcePageReport(
    startDate: Date,
    endDate: Date,
    chartGroupingFilter: string,
    schoolFilter: string,
    mentorFilter: string
  ): Observable<PointSourcePageReportItem[]> {
    return this.get<PointSourcePageReportItem[]>(
      `returnPointSourcePageReport/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}/${chartGroupingFilter}/${schoolFilter}/${mentorFilter}`
    );
  }

  returnPointSourceStaffReport(
    startDate: Date,
    endDate: Date,
    chartGroupingFilter: string,
    schoolFilter: string,
    mentorFilter: string
  ): Observable<PointSourceStaffReportItem[]> {
    return this.get<PointSourceStaffReportItem[]>(
      `returnPointSourceStaffReport/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}/${chartGroupingFilter}/${schoolFilter}/${mentorFilter}`
    );
  }

  returnPointTypesAwardedReport(
    startDate: Date,
    endDate: Date,
    chartGroupingFilter: string,
    schoolFilter: string,
    mentorFilter: string
  ): Observable<PointTypeAwardReportItem[]> {
    return this.get<PointTypeAwardReportItem[]>(
      `returnPointTypesAwardedReport/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}/${chartGroupingFilter}/${schoolFilter}/${mentorFilter}`
    );
  }

  returnPointDetailReport(startDate: Date, endDate: Date, schoolFilter: string): Observable<PointDetailReportItem[]> {
    return this.get<PointDetailReportItem[]>(
      `returnPointDetailReport/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}/${schoolFilter}`
    );
  }

  returnFlaggedStudentsReport(startDate: Date, endDate: Date): Observable<FlaggedStudentReportItem[]> {
    return this.get<FlaggedStudentReportItem[]>(
      `returnFlaggedStudentsReport/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(endDate)}`
    );
  }

  returnFlagsGeneratedReport(
    startDate: Date,
    endDate: Date,
    chartGroupingFilter: string,
    schoolFilter: string,
    mentorFilter: string
  ): Observable<FlagsGeneratedReportItem[]> {
    return this.get<FlagsGeneratedReportItem[]>(
      `ReturnFlagsGeneratedReport/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}/${chartGroupingFilter}/${schoolFilter}/${mentorFilter}`
    );
  }

  // Posts
  createQuoteOfTheDay(item: QuoteOfTheDay): Observable<number> {
    return this.post<number>(`createQuoteOfTheDay/${Utility.getDateQueryFormat()}`, item);
  }

  createCommunication(item: Communication): Observable<number> {
    return this.post<number>(`createCommunication`, item);
  }

  createPoints(item: Points): Observable<boolean> {
    if (!item.pageSource) {
      item.pageSource = PagePointSource.StudentsPage;
    }
    return this.post<boolean>(`createPoints`, item);
  }

  createPointsList(items: Points[]): Observable<boolean> {
    items.forEach(item => {
      if (!item.pageSource) {
        item.pageSource = PagePointSource.PbisDashboard;
      }
    });

    return this.post<boolean>(`createPointsList`, items);
  }

  saveCommunicationList(item: CommunicationList): Observable<boolean> {
    return this.post<boolean>(`saveCommunicationList`, item);
  }

  returnPotentialCommunicationListEntries(filter: CommunicationFilter): Observable<CommunicationListEntry[]> {
    return this.post<CommunicationListEntry[]>(`returnPotentialCommunicationListEntries`, filter);
  }

  generateIntervention(item: { reason: string; studentId: number }) {
    return this.post<boolean>(`generateIntervention`, item);
  }

  // Puts
  updateQuotesOfTheDay(items: QuoteOfTheDay[]): Observable<boolean> {
    return this.put<boolean>(`updateQuotesOfTheDay/${Utility.getDateQueryFormat()}`, items);
  }

  updateEngagementFlag(item: EngagementFlag): Observable<Intervention> {
    return this.put<Intervention>(`updateEngagementFlag`, item);
  }

  updateCommunication(item: Communication): Observable<boolean> {
    return this.put<boolean>(`updateCommunication`, item);
  }

  updateEnrollmentDate(value: Date, studentId: number): Observable<boolean> {
    const dateRoute = value ? Utility.getDateQueryFormat(value) : "";
    return this.put<boolean>(`updateEnrollmentDate/${studentId}/${dateRoute}`);
  }

  updateUnenrollmentDate(value: Date, studentId: number): Observable<boolean> {
    const dateRoute = value ? Utility.getDateQueryFormat(value) : "";
    return this.put<boolean>(`updateUnenrollmentDate/${studentId}/${dateRoute}`);
  }

  updateCommunityPassportForms(items: CommunityPassportForm[]) {
    return this.post<boolean>("updateCommunityPassportForms", items);
  }

  saveEmailTemplate(item: EmailTemplate): Observable<number> {
    return this.put<number>(`saveEmailTemplate`, item);
  }

  // Deletes
  deleteQuoteOfTheDay(id: number): Observable<boolean> {
    return this.delete<boolean>(`deleteQuoteOfTheDay/${id}/${Utility.getDateQueryFormat()}`);
  }

  deleteCommunication(id: number): Observable<boolean> {
    return this.delete<boolean>(`deleteCommunication/${id}`);
  }

  deletePoints(id: number): Observable<boolean> {
    return this.delete<boolean>(`deletePoints/${id}`);
  }

  deleteCommunicationList(id: number): Observable<boolean> {
    return this.delete<boolean>(`DeleteCommunicationList/${id}`);
  }

  /**
   * Deletes an email template the signed-in user owns.
   * @param id The email template ID
   */
  deleteEmailTemplate(id: number): Observable<boolean> {
    return this.delete<boolean>(`deleteEmailTemplate/${id}`);
  }
}
