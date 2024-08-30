import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssignmentsCompleted } from "@models/assignments-completed.model";
import { PointsType } from "app/enums";
import {
  Announcement,
  AppTile,
  EngagementFlag,
  InterventionThreshold,
  Points,
  QuoteOfTheDay,
  ReFuelEligibility,
  ReFuelReservation,
} from "app/models";
import { ApiService, Utility } from "app/shared";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class StudentService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "student");
  }

  // Gets
  returnAssignmentsCompleted(studentId: number, startDate: Date, endDate: Date) {
    return this.get<AssignmentsCompleted>(
      `returnAssignmentsCompleted/${studentId}/${Utility.getDateQueryFormat(startDate)}/${Utility.getDateQueryFormat(
        endDate
      )}`
    );
  }

  returnAppTiles(studentId: number): Observable<AppTile[]> {
    return this.get<AppTile[]>(`returnAppTiles/${studentId}`);
  }

  returnQuoteOfTheDay(): Observable<QuoteOfTheDay> {
    return this.get<QuoteOfTheDay>(`returnQuoteOfTheDay/${Utility.getDateQueryFormat()}`);
  }

  returnInterventionThreshold(grade: string): Observable<InterventionThreshold> {
    return this.get<InterventionThreshold>(`returnInterventionThreshold/${grade}`);
  }

  returnAnnouncements(studentId: number): Observable<Announcement[]> {
    return this.get<Announcement[]>(`returnAnnouncements/${studentId}`);
  }

  returnAnnouncementById(id: number): Observable<Announcement> {
    return this.get<Announcement>(`returnAnnouncementById/${id}`);
  }

  returnPointDetails(studentId: number, pointsType: PointsType): Observable<Points[]> {
    return this.get<Points[]>(`returnPointDetails/${studentId}/${pointsType}`);
  }

  returnReFuelReservationById(
    studentId: number,
    date: Date
  ): Observable<{ reservation: ReFuelReservation; eligibility: ReFuelEligibility }> {
    return this.get<{ reservation: ReFuelReservation; eligibility: ReFuelEligibility }>(
      `returnReFuelReservationById/${studentId}/${Utility.getDateQueryFormat(date)}`
    );
  }

  returnEngagementFlagsByStudentId(
    studentId: number,
    filter?: {
      schoolYear?: Date;
      acknowledgedByStudent?: boolean;
    }
  ): Observable<EngagementFlag[]> {
    return this.get<EngagementFlag[]>(
      `returnEngagementFlagsByStudentId/${studentId}/${
        filter?.schoolYear ? Utility.getDateQueryFormat(filter.schoolYear) : ""
      }?acknowledgedByStudent=${filter?.acknowledgedByStudent ?? ""}`
    );
  }

  // Posts
  updateAppTiles(studentId: number, appTiles: AppTile[]): Observable<boolean> {
    return this.post<boolean>(`updateAppTiles/${studentId}`, appTiles);
  }

  markAnnouncementRead(id: number): Observable<boolean> {
    return this.post<boolean>(`markAnnouncementRead`, { id });
  }

  reserveReFuelReservation(
    date: Date,
    reservation: ReFuelReservation
  ): Observable<{ openSpot: boolean; standbyPosition: boolean }> {
    return this.post<{ openSpot: boolean; standbyPosition: boolean }>(
      `reserveReFuelReservation/${Utility.getDateQueryFormat(date)}/${
        reservation.type
      }?generalInquiryResponse=${encodeURIComponent(
        reservation.generalInquiryResponse
      )}&breakfastInquiryResponse=${encodeURIComponent(
        reservation.breakfastInquiryResponse
      )}&lunchInquiryResponse=${encodeURIComponent(reservation.lunchInquiryResponse)}`
    );
  }

  // Puts
  cancelReFuelReservation(date: Date): Observable<boolean> {
    return this.put<boolean>(`cancelReFuelReservation/${Utility.getDateQueryFormat(date)}`);
  }

  acknowledgeEngagementFlag(id: number, acknowledgedByStudent: boolean) {
    return this.put<boolean>(`acknowledgeEngagementFlag/${id}/${acknowledgedByStudent}`);
  }
}
