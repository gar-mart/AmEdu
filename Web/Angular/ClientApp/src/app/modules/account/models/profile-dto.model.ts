import { compare, maxLength, prop, required } from "@rxweb/reactive-form-validators";

export interface ProfileDtoInterface {
  id: string;
  userId: number;
  firstName: string;
  lastName: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export class ProfileDtoModel implements ProfileDtoInterface {
  @prop()
  id: string;

  @prop()
  userId: number;

  @required()
  @maxLength({ value: 50 })
  firstName: string;

  @required()
  @maxLength({ value: 50 })
  lastName: string;

  @prop()
  currentPassword: string;

  @prop()
  newPassword: string;

  @compare({ fieldName: "newPassword" })
  confirmNewPassword: string;

  public constructor(init?: Partial<ProfileDtoInterface>) {
    Object.assign(this, init);
  }
}
