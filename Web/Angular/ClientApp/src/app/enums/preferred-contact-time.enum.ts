export enum PreferredContactTime {
  Morning = 1,
  Afternoon = 2,
  Evening = 3,
}

export const preferredContactTimeOptions = new Map([
  [PreferredContactTime.Morning, "Morning"],
  [PreferredContactTime.Afternoon, "Afternoon"],
  [PreferredContactTime.Evening, "Evening"],
]);
