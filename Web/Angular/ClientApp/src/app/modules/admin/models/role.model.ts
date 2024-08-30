export interface RoleModel {
  // IdentityRole
  id: string; // Guid
  name: string;

  // RoleModel
  isSelected: boolean;
  sourceList: string;
  isOverride: boolean;
  isRevoke: boolean;
  area: string;
  areaName: string;
  view: string;
  viewName: string;
  isCustom: boolean;
  isMeta: boolean;
  roleName: string;
  sortString: string;

  // client side
  revokedRole: RoleModel;
}
