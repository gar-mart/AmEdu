import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: Error | HttpErrorResponse) => {
        if (error["status"] !== 400) {
          // allow the caller to handle 400 errors
          switch (request.method) {
            case "POST":
              this.snackBar.open("An error has occurred.", "Dismiss", {
                duration: 6000,
              });
              break;
            case "GET":
              this.snackBar.open("An error has occurred", "Dismiss", {
                duration: 6000,
              });
              break;
            default:
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
