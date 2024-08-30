import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmationDialogComponent } from "app/design";
import { AppComponent } from "../../../app.component";
import { QuoteOfTheDay } from "../../../models";
import { StaffService } from "../../services";

@Component({
  selector: "app-quote-of-the-day",
  templateUrl: "./quote-of-the-day.component.html",
  styleUrls: ["./quote-of-the-day.component.scss"],
})
export class QuoteOfTheDayComponent implements OnInit {
  @ViewChild("formDirective") private formDirective: NgForm;

  isInitializing = true;
  quoteOfTheDayForm: UntypedFormGroup;
  quotesOfTheDay: QuoteOfTheDay[];

  anyEditsMade = false;
  editing = false;
  saving = false;

  constructor(
    private staffService: StaffService,
    private appComponent: AppComponent,
    private formBuilder: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    appComponent.isBusy = true;
    this.initializeFormGroup();
  }

  ngOnInit() {
    this.staffService.returnQuotesOfTheDay().subscribe(quotesOfTheDay => {
      this.quotesOfTheDay = quotesOfTheDay;

      this.isInitializing = false;
      this.appComponent.isBusy = false;
    });
  }

  addQuote() {
    if (this.saving || this.editing) {
      return;
    }

    if (this.quoteOfTheDayForm.valid) {
      this.saving = true;
      this.appComponent.isBusy = true;

      const newQuote: QuoteOfTheDay = this.quoteOfTheDayForm.value;
      if (!newQuote.author) {
        newQuote.author = "Anonymous";
      }

      this.staffService.createQuoteOfTheDay(newQuote).subscribe(result => {
        if (result <= 0) {
          this.saving = false;
          this.appComponent.isBusy = false;
          this.snackBar.open("Failed to create Quote of the Day", "Close", { panelClass: "success", duration: 3500 });
        } else {
          this.formDirective.resetForm();
          this.saving = false;
          this.appComponent.isBusy = false;

          this.staffService.returnQuotesOfTheDay().subscribe(quotesOfTheDay => {
            this.quotesOfTheDay = quotesOfTheDay;
          });
        }
      });
    }
  }

  editQuotes() {
    this.anyEditsMade = false;
    this.editing = true;
  }

  cancelEdits() {
    if (!this.anyEditsMade) {
      this.saving = false;
      this.appComponent.isBusy = false;
      this.editing = false;
      return;
    }

    this.saving = true;
    this.appComponent.isBusy = true;
    this.staffService.returnQuotesOfTheDay().subscribe(quotesOfTheDay => {
      this.quotesOfTheDay = quotesOfTheDay;
      this.saving = false;
      this.appComponent.isBusy = false;
      this.editing = false;
    });
  }

  saveEdits() {
    if (!this.anyEditsMade) {
      this.saving = false;
      this.appComponent.isBusy = false;
      this.editing = false;
      return;
    }

    this.saving = true;
    this.appComponent.isBusy = true;
    this.staffService.updateQuotesOfTheDay(this.quotesOfTheDay).subscribe(result => {
      if (!result) {
        this.snackBar.open("Failed to update Quotes of the Day", "Close", { panelClass: "success", duration: 3500 });
      }
      this.saving = false;
      this.appComponent.isBusy = false;
      this.editing = false;
    });
  }

  deleteQuote(quote: QuoteOfTheDay) {
    this.saving = true;
    this.appComponent.isBusy = true;
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: "500px",
        autoFocus: false,
        panelClass: ["rounded-dialog-window"],
        data: {
          confirmationMessage: "Are you sure you want to delete this quote? This cannot be undone.",
        },
      })
      .beforeClosed()
      .subscribe(confirmationResult => {
        if (confirmationResult) {
          this.staffService.deleteQuoteOfTheDay(quote.id).subscribe(result => {
            if (result) {
              this.staffService.returnQuotesOfTheDay().subscribe(quotesOfTheDay => {
                this.quotesOfTheDay = quotesOfTheDay;
                this.saving = false;
                this.appComponent.isBusy = false;
              });
            } else {
              this.snackBar.open("Failed to delete Quote of the Day", "Close", {
                panelClass: "success",
                duration: 3500,
              });
              this.saving = false;
              this.appComponent.isBusy = false;
            }
          });
        } else {
          this.saving = false;
          this.appComponent.isBusy = false;
        }
      });
  }

  moveUp(quote: QuoteOfTheDay) {
    const currentIndex = this.quotesOfTheDay.indexOf(quote);
    const newIndex = currentIndex === 0 ? this.quotesOfTheDay.length - 1 : currentIndex - 1;
    this.swapQuotes(currentIndex, newIndex);
  }

  moveDown(quote: QuoteOfTheDay) {
    const currentIndex = this.quotesOfTheDay.indexOf(quote);
    const newIndex = currentIndex === this.quotesOfTheDay.length - 1 ? 0 : currentIndex + 1;
    this.swapQuotes(currentIndex, newIndex);
  }

  private swapQuotes(index1: number, index2: number) {
    const quote = this.quotesOfTheDay[index1];

    // swap dates
    const date = this.quotesOfTheDay[index2].quoteOfTheDayDate;
    this.quotesOfTheDay[index2].quoteOfTheDayDate = quote.quoteOfTheDayDate;
    quote.quoteOfTheDayDate = date;

    // swap positions
    this.quotesOfTheDay[index1] = this.quotesOfTheDay[index2];
    this.quotesOfTheDay[index2] = quote;

    this.anyEditsMade = true;
  }

  private initializeFormGroup() {
    this.quoteOfTheDayForm = this.formBuilder.group({
      quote: [null, Validators.required],
      author: [null],
    });
  }
}
