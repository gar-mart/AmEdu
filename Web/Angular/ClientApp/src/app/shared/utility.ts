import { Validators } from "@angular/forms";
import { Tab, User } from "app/models";
import { Constants } from "./constants";

export abstract class Utility {
  static urlValidator = Validators.pattern(
    /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/
  );
  static orientationModuleIsLoaded = false;

  /**
   * Takes an HTML string and cleans it for an email.
   * 1. Adds https:// to each href attribute that does not start with http:/ or https:/
   * 2. Removes any white-space: pre styles (causes rendering issue in email clients)
   */
  static cleanAngularEditorHtml(html: string): string {
    return html
      ?.replace(/(?<=href=("|'))(?!http)[a-zA-Z\.]+/gi, "https://$&") // clean hrefs
      ?.replace(/white-space:\s?pre/gi, ""); // clean white-space: pre styles
  }

  static setUniqueFileName(files: { name: string }[], file: File, iteration = 0) {
    const name = iteration ? `${file.name} (${iteration})` : file.name;

    if (files.some(f => f.name === name)) {
      return this.setUniqueFileName(files, file, ++iteration);
    }

    Object.defineProperty(file, "name", {
      writable: true,
      value: name,
    });
  }

  static getBeginningOfWeek(): Date {
    // Monday at Midnight is the beginning of the week
    const date = this.getEasternTime();
    date.setDate(date.getDate() - 1); // subtract 1 in case it is Sunday, we want to get the previous Monday not the next Monday
    date.setDate(date.getDate() - date.getDay() + 1); // subtract the day of the week - gets us to current / prev sunday - add 1 gets us to monday
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  static getEndOfWeek(): Date {
    const date = this.getBeginningOfWeek();
    date.setDate(date.getDate() + 7);
    return date;
  }

  static getFridayAtNoon(): Date {
    const date = this.getEasternTime();

    // if today is not friday after noon, calculate the nearest past friday
    if (!(date.getDay() === 5 && date.getHours() >= 12)) {
      const diff = date.getDay() <= 5 ? 7 - 5 + date.getDay() : date.getDay() - 5;
      date.setDate(date.getDate() - diff);
    }

    // return date (friday) at noon
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  }

  static getBeginningOfSchoolYear(): Date {
    const now = this.getEasternTime();
    return new Date(now.getFullYear() - (now.getMonth() >= 6 ? 0 : 1), 6, 1);
  }

  static getEasternTime(date?: Date): Date {
    if (!date) {
      date = new Date();
    }

    return new Date(date.toLocaleString("en-US", { timeZone: "America/New_York" }));
  }

  static buildGradeLevelString(records: string[]): string {
    let outputString = "";
    records = [...new Set(records)];

    if (records?.length) {
      if (records.length === 13) {
        return "K-12";
      } else if (records.length > 0) {
        records = records.sort((a, b) => Number(a) - Number(b));
        if (records[records.length - 1] === "K") {
          records.unshift(records.pop());
        }

        let start, end; // track start and end
        end = start = records[0];
        for (let j = 1; j < records.length; j++) {
          // as long as entries are consecutive, move end forward
          let lastGradeLevel = records[j - 1] === "K" ? 0 : +records[j - 1];
          let currentGradeLevel = records[j] === "K" ? 0 : +records[j];

          if (currentGradeLevel == lastGradeLevel + 1) {
            end = records[j];
          } else {
            // when no longer consecutive, add group to result
            // depending on whether start=end (single item) or not
            let startGradeLevel = start === "K" ? 0 : +start;
            let endGradeLevel = end === "K" ? 0 : +end;

            if (startGradeLevel == endGradeLevel) outputString += start + ",";
            else if (endGradeLevel == startGradeLevel + 1) outputString += start + "," + end + ",";
            else outputString += start + "-" + end + ",";

            start = end = records[j];
          }
        }

        // handle the final group
        if (start == end) outputString += start;
        else outputString += start + "-" + end;
      }

      return outputString;
    }
  }

  static getDateQueryFormat(date?: Date): string {
    if (!date) {
      date = new Date();
    }
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  static toTimeFormat(totalSeconds: number) {
    if (!totalSeconds || totalSeconds < 60) {
      return "-";
    }

    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / 86400);

    const timeFormatBuilder = [];
    if (days) {
      timeFormatBuilder.push(`${days}d`);
    }
    if (hours) {
      timeFormatBuilder.push(`${hours}h`);
    }
    if (minutes) {
      timeFormatBuilder.push(`${minutes}m`);
    }

    return timeFormatBuilder.join(" ");
  }

  static setFavicon(loginType: number | string, document: HTMLDocument) {
    if (loginType) {
      if (Number(loginType) === 1) {
        document.getElementById("app-favicon").setAttribute("href", "/assets/k-5-favicon.ico");
      } else {
        document.getElementById("app-favicon").setAttribute("href", "/assets/favicon.ico");
      }
    }
  }

  static emailAddressIsValid(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email && re.test(String(email).toLowerCase());
  }

  static getNavigationTabs(user: User): Tab[] {
    return [
      Utility.getAdminNavigationTab(user),
      Utility.getReportsNavigationTab(user),
      Utility.getStaffNavigationTab(user),
      Utility.getTeacherNavigationTab(user),
      Utility.getCommunicationNavigationTab(user),
      Utility.getInterventionNavigationTab(user),
    ].filter(tab => tab !== null);
  }

  static getAdminNavigationTab(user: User): Tab {
    const adminTab = this.createDropdownTab("Admin");

    if (user.isAdmin) {
      const engagementSubmenu = this.createDropdownTab("Engagement");
      engagementSubmenu.tabs.push(
        this.createRouterTab(Constants.interventionThresholdsLabel, Constants.interventionThresholdsPath)
      );
      engagementSubmenu.tabs.push(this.createRouterTab(Constants.breaksLabel, Constants.breaksPath));
      adminTab.tabs.push(engagementSubmenu);

      const orientationSubmenu = this.createDropdownTab("Orientation");
      orientationSubmenu.tabs.push(this.createRouterTab(Constants.manageElectivesLabel, Constants.manageElectivesPath));
      orientationSubmenu.tabs.push(
        this.createRouterTab(Constants.manageOrientationLabel, Constants.manageOrientationPath)
      );
      adminTab.tabs.push(orientationSubmenu);
    }

    const signupsSubmenu = this.createDropdownTab("Signups");
    signupsSubmenu.tabs.push(this.createRouterTab(Constants.reFuelLabel, Constants.reFuelPath)); // available to all staff
    adminTab.tabs.push(signupsSubmenu);

    const studentDashboardSubmenu = this.createDropdownTab("Student Dashboard");
    if (user.isAdmin) {
      studentDashboardSubmenu.tabs.push(this.createRouterTab(Constants.appShortcutsLabel, Constants.appShortcutsPath));
    }
    studentDashboardSubmenu.tabs.push(this.createRouterTab(Constants.quotesLabel, Constants.quotesPath)); // available to all staff
    if (user.isAdmin) {
      studentDashboardSubmenu.tabs.push(
        this.createRouterTab(Constants.manageStudentResourcesLabel, Constants.manageStudentResourcesPath)
      );
    }
    adminTab.tabs.push(studentDashboardSubmenu);

    if (user.isAdmin) {
      const userSettingsSubmenu = this.createDropdownTab("User Settings");
      userSettingsSubmenu.tabs.push(this.createRouterTab(Constants.manageStaffLabel, Constants.manageStaffPath));
      userSettingsSubmenu.tabs.push(this.createRouterTab(Constants.manageStudentsLabel, Constants.manageStudentsPath));
      userSettingsSubmenu.tabs.push(
        this.createRouterTab(Constants.enrollmentImportLabel, Constants.enrollmentImportPath)
      );
      adminTab.tabs.push(userSettingsSubmenu);
    }

    return adminTab;
  }

  static getReportsNavigationTab(user: User): Tab {
    const reportsTab = this.createDropdownTab("Reports");
    reportsTab.tabs.push(this.createRouterTab(Constants.engagmentReportLabel, Constants.engagementReportPath));
    reportsTab.tabs.push(this.createRouterTab(Constants.enrollmentReportLabel, Constants.enrollmentReportPath));
    reportsTab.tabs.push(
      this.createRouterTab(Constants.studentPictureExportReportLabel, Constants.studentPictureExportReportPath)
    );
    if (user.isMentor) {
      reportsTab.tabs.push(this.createRouterTab(Constants.studentListLabel, Constants.studentListPath));
    }
    if (user.isMentor || user.isAdmin) {
      reportsTab.tabs.push(this.createRouterTab(Constants.orientationReportLabel, Constants.orientationReportPath));
    }

    reportsTab.tabs.push(this.createRouterTab(Constants.pbisDashboardLabel, Constants.pbisDashboardPath));

    return reportsTab;
  }

  static getStaffNavigationTab(user: User): Tab {
    return user.isStaff ? this.createRouterTab(Constants.studentsLabel, Constants.studentsPath) : null;
  }

  static getTeacherNavigationTab(user: User): Tab {
    return user.isTeacher || user.isAdmin
      ? this.createRouterTab(Constants.liveLessonsLabel, Constants.liveLessonsPath)
      : null;
  }

  static getCommunicationNavigationTab(user: User): Tab {
    return user.isStaff ? this.createRouterTab(Constants.communicationLabel, Constants.communicationPath) : null;
  }

  static getInterventionNavigationTab(user: User): Tab {
    if (!user.isStaff) {
      return null;
    }

    const interventionsTab = this.createDropdownTab("Interventions");
    interventionsTab.tabs.push(
      this.createRouterTab(Constants.interventionsStudentLabel, Constants.interventionsStudentPath)
    );
    interventionsTab.tabs.push(
      this.createRouterTab(Constants.interventionsReportLabel, Constants.interventionsReportPath)
    );

    if (user.isInterventionist || user.isAdmin) {
      interventionsTab.tabs.push(
        this.createRouterTab(Constants.interventionsEmailTemplatesLabel, Constants.interventionsEmailTemplatesPath)
      );
    }
    return interventionsTab;
  }

  private static createDropdownTab(label: string): Tab {
    return { label, tabs: [] };
  }

  private static createRouterTab(label: string, path: string): Tab {
    const formattedPathParts = path.split("/").filter(value => !!value);
    formattedPathParts.unshift("..");
    return { routerPath: formattedPathParts.join("/"), path, label };
  }
}
