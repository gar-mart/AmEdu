import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-communication-filter-staff",
  templateUrl: "./communication-filter-staff.component.html",
  styleUrls: ["./communication-filter-staff.component.scss"],
})
export class CommunicationFilterStaffComponent implements OnInit, OnDestroy {
  @Output() quickFilter = new EventEmitter<string>();
  quickFilterFormControl = new UntypedFormControl();
  subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.subscriptions.push(this.quickFilterFormControl.valueChanges.subscribe(value => this.quickFilter.emit(value)));
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
