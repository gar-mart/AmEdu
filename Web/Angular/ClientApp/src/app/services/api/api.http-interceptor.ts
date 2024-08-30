import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "app/shared";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { GlobalLoadingIndicatorService } from "../global-loading-indicator.service";

@Injectable({
  providedIn: "root",
})
export class ApiHttpInterceptor implements HttpInterceptor {
  private isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/;

  constructor(private globalLoadingIndicatorService: GlobalLoadingIndicatorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!(request.body instanceof FormData)) {
      request = this.setHeaders(request);
    }

    // todo: this can be removed once AmEdu fully transitions to Google
    request = request.clone({
      headers: request.headers.set("Login-Provider", localStorage.getItem(Constants.loginProvider)),
    });

    const loadingEventRunning = this.globalLoadingIndicatorService.startEvent();

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.convert(event.body, false);
        }

        return event;
      }),
      catchError(err => throwError(err)),
      finalize(() => this.globalLoadingIndicatorService.endEvent(loadingEventRunning))
    );
  }

  private setHeaders(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      body: this.convert(request.body, true),
    });
  }

  private convert(body: any, isRequest: boolean) {
    if (body === null || body === undefined || body instanceof Date || typeof body !== "object") {
      return body;
    }

    if (Array.isArray(body)) {
      return body.map(item => this.convert(item, isRequest));
    }

    if (isRequest) {
      // clone the object so we don't mutate the caller's object
      body = Object.assign({}, body);
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (this.isIsoDateString(value) && !isRequest) {
        // don't convert UTC dates to local time for AmEdu backwards compatibility
        body[key] = new Date(value.replace("Z", ""));
      } else if (value instanceof Set) {
        // convert sets into arrays so that they get serialized as an array with values instead of as empty object
        body[key] = this.convert([...value], isRequest);
      } else if (typeof value === "object") {
        body[key] = this.convert(value, isRequest);
      }
    }

    return body;
  }

  private isIsoDateString(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    return typeof value === "string" && this.isoDateFormat.test(value);
  }
}
