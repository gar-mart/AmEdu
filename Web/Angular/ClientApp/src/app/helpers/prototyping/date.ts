import { WeekDay } from "@angular/common";

declare global {
  interface Date {
    fdGetFirstDayOfWeek(): Date;
    fdGetDayOfWeek(day: number): Date;
    fdAdjustDayValue(days: number, excludeSunday?: boolean): Date;
    fdAddMinutes(minutes: number): Date;
    fdGetDateOnly(): Date;
  }
}

Date.prototype.fdGetFirstDayOfWeek = function () {
  return this.fdGetDayOfWeek(WeekDay.Sunday);
};

Date.prototype.fdGetDayOfWeek = function (day: WeekDay) {
  return new Date(this).fdAdjustDayValue(-1 * this.getDay() + day);
};

Date.prototype.fdAdjustDayValue = function (days, excludeSunday = false) {
  let newDate = new Date(this.setDate(this.getDate() + days));
  if (excludeSunday) {
    if (newDate.getDay() == 0 && days < 0) {
      newDate = new Date(this.setDate(this.getDate() - 1));
    }

    if (newDate.getDay() == 0 && days > 0) {
      newDate = new Date(this.setDate(this.getDate() + 1));
    }
  }
  return newDate;
};

Date.prototype.fdAddMinutes = function (minutes: number) {
  return new Date(this.getTime() + minutes * 60000);
};

Date.prototype.fdGetDateOnly = function () {
  const self: Date = this;
  return new Date(self.getFullYear(), self.getMonth(), self.getDate());
};
