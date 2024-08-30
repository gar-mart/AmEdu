import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "app/models";
import { Observable } from "rxjs";
import { ApiService } from "../shared";

@Injectable({ providedIn: "root" })
export class AuthorizationService extends ApiService {
  isAuthorizing = false;

  constructor(http: HttpClient) {
    super(http, "authorization");
  }

  getUserByUserName(username: string): Observable<User> {
    return this.get<User>(username);
  }
}
