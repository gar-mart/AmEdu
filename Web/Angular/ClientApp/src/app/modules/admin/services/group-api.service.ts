import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ControllerBase } from "src/app/services/api/controller-base";
import { GroupInterface } from "../models/group.model";

@Injectable({ providedIn: "root" })
export class GroupApiService extends ControllerBase<GroupInterface> {
  constructor(http: HttpClient) {
    super(http, "Security/Group");
  }

  //#region super implementation
  get() {
    return super.$get();
  }

  getById(id: string) {
    return super.$getById(id);
  }

  post(model: GroupInterface) {
    return super.$post<string>(model);
  }

  put(model: GroupInterface) {
    return super.$put(model);
  }

  delete(id: string) {
    return super.$delete(id);
  }
  //#endregion
}
