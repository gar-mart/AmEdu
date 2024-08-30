import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DirectoryEvent } from "../models";
import { ApiService, Utility } from "../shared";
import { PreviewEmailModel } from "../staff/components/emailing/preview-email-dialog/preview-email.model";

@Injectable({ providedIn: "root" })
export class DirectoryService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "directory");
  }

  returnUnreadInboxCount(emailAddress: string): Observable<number> {
    return this.get<number>(`returnUnreadInboxCount/${emailAddress}`);
  }

  returnCalendarEvents(emailAddress: string): Observable<DirectoryEvent[]> {
    const now = new Date();
    const startDate = Utility.getDateQueryFormat();
    const endDate = Utility.getDateQueryFormat(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 15));

    // return max 10 items within the next two weeks
    return this.get<DirectoryEvent[]>(`returnCalendarEvents/${emailAddress}/${startDate}/${endDate}`);
  }

  sendCommunicationEmail(email: PreviewEmailModel, options: { interventionId: number } = null): Observable<boolean> {
    // in order to make this post since we are posting several files, we need to use FormData and build the form by hand
    const formData = new FormData();

    formData.append("fromEmailAddress", email.fromEmailAddress);
    formData.append("subject", email.subject);
    formData.append("body", email.body);
    formData.append("bccAllRecipients", (email.bccAllRecipients || false).toString());
    for (let attachment of email?.attachments) {
      formData.append("attachments", attachment);
    }

    for (let i = 0; i < email.optionalRecipients?.length; i++) {
      formData.append(
        `recipients[${i}].includeStudent`,
        (
          (email.optionalRecipients[i].includeStudent &&
            Utility.emailAddressIsValid(email.optionalRecipients[i].userEmailAddress)) ||
          false
        ).toString()
      );
      formData.append(
        `recipients[${i}].includeGuardian1`,
        (
          (email.optionalRecipients[i].includeGuardian1 &&
            Utility.emailAddressIsValid(email.optionalRecipients[i].guardianEmailAddress)) ||
          false
        ).toString()
      );
      formData.append(
        `recipients[${i}].includeGuardian2`,
        (
          (email.optionalRecipients[i].includeGuardian2 &&
            Utility.emailAddressIsValid(email.optionalRecipients[i].secondaryGuardianEmailAddress)) ||
          false
        ).toString()
      );
      formData.append(
        `recipients[${i}].includeMentor`,
        (
          (email.optionalRecipients[i].includeMentor &&
            Utility.emailAddressIsValid(email.optionalRecipients[i].mentorEmail)) ||
          false
        ).toString()
      );
      formData.append(
        `recipients[${i}].includeStaff`,
        (
          (email.optionalRecipients[i].includeStaff &&
            Utility.emailAddressIsValid(email.optionalRecipients[i].userEmailAddress)) ||
          false
        ).toString()
      );
      formData.append(`recipients[${i}].userId`, (email.optionalRecipients[i].userId || 0).toString());
      formData.append(`recipients[${i}].userEmailAddress`, email.optionalRecipients[i].userEmailAddress);
      formData.append(`recipients[${i}].isStaff`, (email.optionalRecipients[i].isStaff || false).toString());
      formData.append(`recipients[${i}].guardianEmailAddress`, email.optionalRecipients[i].guardianEmailAddress);
      formData.append(
        `recipients[${i}].secondaryGuardianEmailAddress`,
        email.optionalRecipients[i].secondaryGuardianEmailAddress
      );
      formData.append(`recipients[${i}].mentorEmail`, email.optionalRecipients[i].mentorEmail);
    }

    const validAdditionalRecipients = email.additionalRecipients?.filter(x => Utility.emailAddressIsValid(x)) ?? [];
    for (let i = 0; i < validAdditionalRecipients.length; i++) {
      formData.append(`additionalRecipients[${i}]`, validAdditionalRecipients[i]);
    }

    return this.post<boolean>(`sendCommunicationEmail/${options?.interventionId || ""}`, formData, this.http, {
      "Content-Type": "",
    });
  }
}
