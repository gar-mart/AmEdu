import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormConfig } from "@rxweb/reactive-form-validators";
import { ApiHttpInterceptor } from "@services/api/api.http-interceptor";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { NgxMaskModule } from "ngx-mask";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthCallbackComponent, EmailOptOutComponent, LoginComponent, ResourcesComponent } from "./components";
import { DesignModule } from "./design";
import { GlobalErrorHandler } from "./global-error-handler";
import { ServerErrorInterceptor } from "./server-error-interceptor";

@NgModule({
  declarations: [AppComponent, AuthCallbackComponent, LoginComponent, ResourcesComponent, EmailOptOutComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    DesignModule,
    FlexLayoutModule,
    HttpClientModule,
    LazyLoadImageModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    // interceptors/handlers
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true,
    },

    // components
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ReactiveFormConfig.set({
      internationalization: {
        dateFormat: "mdy",
        seperator: "/",
      },
      validationMessage: {
        range: "This field must be between {{1}} and {{2}}.",
        required: "This field is required.",
        minLength: "A minimum of {{1}} character(s) are allowed.",
        maxLength: "A maximum of {{1}} character(s) are allowed.",
        minNumber: "A minimum number of {{1}} is allowed.",
        maxNumber: "A maximum number of {{1}} is allowed.",
        minDate: "A minimum date of {{1}} is allowed.",
        maxDate: "A maximum date of {{1}} is allowed.",
        notEmpty: "This field cannot be empty.",
        requiredTrue: "This field must be checked.",
        alpha: "Only letters are allowed.",
        numeric: "Only numbers are allowed.",
        alphaNumeric: "Only letters and numbers are allowed.",
        ascii: "Only ASCII characters are allowed.",
        url: "Invalid URL format.",
        email: "Invalid email format.",
        password: "Your password is not strong enough.",
        compare: "This value doesn't match.",
        matDatepickerParse: "The format is invalid.",
      },
    });
  }
}
