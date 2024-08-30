import { AppEnvironment } from "app/enums/repository/app-environment.enum";
import { IEnvironment, defaultEnvironment } from "./environment.definition";

export const environment: IEnvironment = Object.assign(defaultEnvironment, {
  configuration: AppEnvironment.Testing,
});
