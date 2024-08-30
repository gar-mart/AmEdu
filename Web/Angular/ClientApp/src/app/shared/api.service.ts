import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@services/auth/auth.service";
import { UserDtoInterface } from "app/modules/account/models/user-dto.model";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

export abstract class ApiService {
  protected apiUrl = environment.apiUrl + "/";
  protected headers = this.buildStandardHeaders();

  private authService = inject(AuthService);

  get user(): UserDtoInterface {
    return this.authService.currentUser;
  }

  constructor(protected http: HttpClient, controllerUrlPrefix?: string) {
    if (controllerUrlPrefix) {
      this.apiUrl += controllerUrlPrefix.startsWith("/") ? controllerUrlPrefix.substring(1) : controllerUrlPrefix;

      if (!this.apiUrl.endsWith("/")) {
        this.apiUrl += "/";
      }
    }
  }

  protected get<T>(url: string, headers?: { [name: string]: string }): Observable<T> {
    return this.http
      .get<T>(this.format(url), { headers: this.buildStandardHeaders(headers), observe: "response" })
      .pipe(map(this.parseResponse))
      .pipe(catchError(error => throwError(error)));
  }

  protected post<T>(
    url: string,
    item = null,
    http: HttpClient = null,
    headers: { [name: string]: string } = null
  ): Observable<T> {
    if (item instanceof File) {
      return this.postFile(url, item, http);
    }

    return (http || this.http)
      .post<T>(this.format(url), item, { headers: this.buildStandardHeaders(headers), observe: "response" })
      .pipe(map(this.parseResponse))
      .pipe(catchError(error => throwError(error)));
  }

  private postFile<T>(url: string, file: File, http?: HttpClient): Observable<T> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.post<T>(url, formData, http, { "Content-Type": "" });
  }

  protected put<T>(url: string, item = null, headers: { [name: string]: string } = null): Observable<T> {
    if (item instanceof File) {
      return this.putFile(url, item);
    }

    return this.http
      .put<T>(this.format(url), item, { headers: this.buildStandardHeaders(headers), observe: "response" })
      .pipe(map(this.parseResponse))
      .pipe(catchError(error => throwError(error)));
  }

  private putFile<T>(url: string, file: File): Observable<T> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.put<T>(url, formData, { "Content-Type": "" });
  }

  protected delete<T>(url: string, headers?: { [name: string]: string }): Observable<T> {
    return this.http
      .delete<T>(this.format(url), { headers: this.buildStandardHeaders(headers), observe: "response" })
      .pipe(map(this.parseResponse))
      .pipe(catchError(error => throwError(error)));
  }

  protected buildStandardHeaders(headers?: { [name: string]: string }) {
    const httpHeaders = {
      "Content-Type": "application/json; charset=utf-8;",
      Accept: "*/*",
      TimezoneOffset: new Date().getTimezoneOffset().toString(),
    };

    if (!headers) {
      headers = {};
    }

    Object.keys(headers).forEach(key => {
      if (!headers[key]) {
        delete httpHeaders[key];
      }
    });

    return new HttpHeaders(httpHeaders);
  }

  private format(url) {
    return this.apiUrl + (url.startsWith("/") ? url.substring(1) : url);
  }

  private parseResponse<T>(response: HttpResponse<T>): T {
    return response.body;
  }
}
