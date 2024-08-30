import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ControllerBase } from "../../../services/api/controller-base";
import { ApplicationIdentityUserInterface } from "../../account/models/application-identity-user.model";
import { RoleModel } from "../models/role.model";

@Injectable({ providedIn: "root" })
export class UserApiService extends ControllerBase<ApplicationIdentityUserInterface> {
  constructor(http: HttpClient) {
    super(http, "Security/User");
  }

  //#region super implementation
  get(includeInactive = false) {
    return super.$get({ includeInactive });
  }

  getById(id: number) {
    return super.$getById(id);
  }

  post(model: ApplicationIdentityUserInterface) {
    return super.$post<number>(model);
  }

  put(model: ApplicationIdentityUserInterface) {
    return super.$put(model);
  }

  delete(id: number) {
    return super.$delete(id);
  }
  //#endregion

  getRolesForUser(userId: number, groupIds: string[] = null) {
    return super._get<RoleModel[]>({
      query: { userId, groupIds },
      url: this.getRolesForUser.name,
    });
  }
}
