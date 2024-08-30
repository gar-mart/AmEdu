import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { ContactContent } from "@models/step-content.model";
import { User } from "@models/user.model";
import { CommonService } from "@services/common.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-contact-content",
  templateUrl: "./contact-content.component.html",
  styleUrls: ["./contact-content.component.scss"],
})
export class ContactContentComponent implements OnInit, OnDestroy {
  @Input() content: ContactContent;
  @Input() editMode: boolean;
  @Input() previewMode: boolean;
  @Output() edit = new EventEmitter<void>();

  user: User;
  filterUsers: User[];
  userFilter = new UntypedFormControl();
  users: User[] = [];
  selectedUsers: User[] = [];
  displayedColumns: string[] = ["moreOptions", "title", "email", "appointmentLink"];

  subscriptions: Subscription[] = [];

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    if (this.content && this.content.userId !== 0) {
      this.commonService.returnUserById(this.content.userId).subscribe(r => {
        if (r) {
          this.selectedUsers.push(r);
        }
      });
    }

    if (this.editMode) {
      this.commonService.returnStaffBySearch().subscribe(r => {
        this.users = r;
      });

      this.subscriptions.push(
        this.userFilter.valueChanges.subscribe(val => {
          if (val.id && this.selectedUsers.length === 0) {
            this.selectedUsers.push(val);
            this.user = val;
            this.content.userId = val.id;
            this.edit.emit();
          } else if (val) {
            this.filterUsers = this.users.filter(x => x.name.toLowerCase().includes(val.toLowerCase()));
          }
        })
      );
    }

    if (this.content.userId) {
      this.commonService.returnUserById(this.content.userId).subscribe(r => {
        if (r) {
          this.user = r;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  displayUser() {
    return "";
  }

  deleteUser() {
    this.selectedUsers = [];
    this.content.userId = 0;
    this.user = null;
    this.edit.emit();
  }
}
