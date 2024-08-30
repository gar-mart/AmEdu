import { AppTileGradeLevel } from "./app-tile-grade-level.model";
import { AppTileMetadata } from "./app-tile-metadata.model";

export interface AppTile {
  userId: number;
  metadataId: number;
  show: boolean;
  orderBy: number;
  gradeLevelString: string;
  appTileGradeLevels: AppTileGradeLevel[];
  gradeLevels: string[];

  metadata: AppTileMetadata;
}
