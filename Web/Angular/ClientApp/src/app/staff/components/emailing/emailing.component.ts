import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { Utility } from "app/shared";
import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";
import { CommunicationList, CommunicationListEntry, Staff } from "../../../models";
import { EmailTemplate } from "../../../models/email-template.model";
import { CommonService } from "../../../services";
import { StaffService } from "../../services";
import { EditRecipientsTabComponent } from "./edit-recipients-tab/edit-recipients-tab.component";
import { FilterTabComponent } from "./filter-tab/filter-tab.component";

@Component({
  templateUrl: "./emailing.component.html",
  styleUrls: ["./emailing.component.scss"],
})
export class EmailingComponent implements OnInit {
  @ViewChild(FilterTabComponent) filterTab: FilterTabComponent;
  @ViewChild(EditRecipientsTabComponent) editRecipientsTab: EditRecipientsTabComponent;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  isInitializing = true;
  mentors: Staff[];
  lists: CommunicationList[];
  emailTemplates: EmailTemplate[] = [];

  includedEntries: CommunicationListEntry[] = [];

  get recipients(): string[] {
    const uniqueEmails = new Set<string>();

    this.includedEntries.forEach(e => {
      if (e.includeGuardian1) {
        uniqueEmails.add(e.guardianEmailAddress);
      }
      if (e.includeGuardian2) {
        uniqueEmails.add(e.secondaryGuardianEmailAddress);
      }
      if ((e.includeStudent && !e.isStaff) || (e.includeStaff && e.isStaff)) {
        uniqueEmails.add(e.userEmailAddress);
      }
      if (e.includeMentor) {
        uniqueEmails.add(e.mentorEmail);
      }
      if (e.additionalRecipientEmailAddress) {
        uniqueEmails.add(e.additionalRecipientEmailAddress);
      }
    });
    return [...uniqueEmails].filter(x => Utility.emailAddressIsValid(x));
  }

  get recipientCount(): number {
    return this.recipients.length;
  }

  get anyRecipientsIncluded(): boolean {
    return this.includedEntries.some(
      e =>
        e.includeStudent ||
        e.includeGuardian1 ||
        e.includeGuardian2 ||
        e.includeMentor ||
        e.additionalRecipientEmailAddress ||
        e.includeStaff
    );
  }

  constructor(private staffService: StaffService, private commonService: CommonService) {}

  ngOnInit() {
    const $mentors = this.commonService.getMentors(true).pipe(tap(mentors => (this.mentors = mentors)));
    const $lists = this.staffService.returnCommunicationLists().pipe(tap(lists => (this.lists = lists)));
    const $emailTemplates = this.staffService.returnEmailTemplates().pipe(
      tap(emailTemplates => {
        // default option
        emailTemplates.unshift({
          id: 0,
          html: "",
          name: "New Template",
          userId: this.commonService.user.userId,
        });

        this.emailTemplates = emailTemplates;
      })
    );

    // execute the requests in parallel and wait for all to complete
    forkJoin([$mentors, $lists, $emailTemplates])
      .subscribe()
      .add(() => {
        this.isInitializing = false;
      });
  }

  includeEntries(entries: CommunicationListEntry[]) {
    const includedEntries = this.includedEntries.concat(entries);
    includedEntries.sort((a, b) => a.userName.localeCompare(b.userName));
    this.includedEntries = includedEntries;
  }

  removeEntries(entries: CommunicationListEntry[]) {
    this.includedEntries = this.includedEntries.filter(e1 => !entries.some(e2 => e2.userId === e1.userId));
    if (!this.includedEntries.length) {
      this.tabGroup.selectedIndex = 0;
      this.filterTab.allStudentsToggled = false;
      this.editRecipientsTab.sendToStudentsFormControl.patchValue(false);
      this.editRecipientsTab.sendToGuardiansFormControl.patchValue(false);
      this.editRecipientsTab.sendToSecondaryGuardiansFormControl.patchValue(false);
    }
  }

  listAdded() {
    this.staffService.returnCommunicationLists().subscribe(lists => (this.lists = lists));
  }

  listDeleted(id: number) {
    this.lists = this.lists.filter(l => l.id !== id);
  }
}
