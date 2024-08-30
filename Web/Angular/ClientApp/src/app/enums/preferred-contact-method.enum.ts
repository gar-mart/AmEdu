export enum PreferredContactMethod {
  Email = 1,
  Phone = 2,
  Text = 3,
}

export const preferredContactMethodOptions = new Map([
  [PreferredContactMethod.Email, "Email"],
  [PreferredContactMethod.Phone, "Phone"],
  [PreferredContactMethod.Text, "Text"],
]);
