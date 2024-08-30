import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReFuelInquiry } from "@models/re-fuel-inquiry.model";
import { ReFuel, ReFuelLog, ReFuelReservation } from "app/models";
import { ApiService, Utility } from "app/shared";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ReFuelCoordinatorService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "ReFuelCoordinator");
  }

  // Gets
  returnReFuel(): Observable<ReFuel> {
    return this.get<ReFuel>("returnReFuel");
  }

  returnReFuelReservations(week: Date): Observable<ReFuelReservation[]> {
    return this.get<ReFuelReservation[]>(`returnReFuelReservations/${Utility.getDateQueryFormat(week)}`);
  }

  returnReFuelLogs(studentId: number, day: Date) {
    return this.get<ReFuelLog[]>(`returnReFuelLogs/${studentId}/${Utility.getDateQueryFormat(day)}`);
  }

  returnReFuelInquiry(date: Date) {
    return this.get<ReFuelInquiry>(`returnReFuelInquiry/${Utility.getDateQueryFormat(date)}`);
  }

  // Puts
  updateReFuelInquiry(item: ReFuelInquiry): Observable<boolean> {
    return this.put<boolean>("updateReFuelInquiry", item);
  }

  updateReFuel(item: ReFuel): Observable<boolean> {
    return this.put<boolean>("updateReFuel", item);
  }

  updateReFuelReservation(item: ReFuelReservation): Observable<boolean> {
    return this.put<boolean>("updateReFuelReservation", item);
  }

  updateReFuelLogs(items: ReFuelLog[], studentId: number, day: Date): Observable<boolean> {
    return this.put<boolean>(`updateReFuelLogs/${studentId}/${Utility.getDateQueryFormat(day)}`, items);
  }
}
