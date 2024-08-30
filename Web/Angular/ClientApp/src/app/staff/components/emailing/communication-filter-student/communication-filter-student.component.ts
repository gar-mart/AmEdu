import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { Staff } from "../../../../models";
import { CommunicationFilter } from "../communication-filter/communication.filter";

@Component({
  selector: "app-communication-filter-student",
  templateUrl: "./communication-filter-student.component.html",
  styleUrls: ["./communication-filter-student.component.scss"],
})
export class CommunicationFilterStudentComponent implements OnInit, OnDestroy {
  @Input() mentors: Staff[] = [];
  @Input() filter: UntypedFormGroup;
  @Output() serverFilter = new EventEmitter<CommunicationFilter>();
  @Output() quickFilter = new EventEmitter<string>();

  quickFilterFormControl = new UntypedFormControl();
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(this.filter.valueChanges.subscribe(value => this.serverFilter.emit(value)));
    this.subscriptions.push(this.quickFilterFormControl.valueChanges.subscribe(value => this.quickFilter.emit(value)));
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
