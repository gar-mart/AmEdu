import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MTX_DATETIME_FORMATS } from "@ng-matero/extensions/core";
import { enUS } from "date-fns/locale";

const dateProviders = [
  {
    provide: MAT_DATE_LOCALE,
    useValue: enUS,
  },
  {
    provide: MTX_DATETIME_FORMATS,
    useValue: {
      parse: {
        dateInput: ["P", "PP", "PPP"],
        datetimeInput: ["Pp", "PPpp"],
        timeInput: ["H:mm", "h:mm a", "h:mma", "hmm", "hmma"],
        monthInput: ["MMM", "MMM yyyy", "MMMMyyyy", "MMMM", "MMMM yyyy", "MMMMyyyy"],
        yearInput: ["yyyy"],
      },
      display: {
        dateInput: "P",
        datetimeInput: "Pp",
        timeInput: "p",
        monthInput: "MMM yyyy",
        yearInput: "yyyy",
        dateA11yLabel: "PP",
        monthLabel: "MMM",
        monthDayLabel: "MMM d",
        monthDayA11yLabel: "MMMM d",
        monthYearLabel: "MMM yyyy",
        monthYearA11yLabel: "MMMM yyyy",
        timeLabel: "p",
        popupHeaderDateLabel: "MMM dd, E",
      },
    },
  },
];

export default dateProviders;
