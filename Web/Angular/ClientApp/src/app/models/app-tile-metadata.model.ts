import { AppTileGradeLevel } from "./app-tile-grade-level.model";

export interface AppTileMetadata {
  id: number;
  title: string;
  image: string;
  url: string;
  defaultOrderBy: number;
  alwaysShow: boolean;
  isDefault: boolean;
  appTileGradeLevels: AppTileGradeLevel[];
  gradeLevelString: string;
  gradeLevels: string[];
}
