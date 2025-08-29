export interface ILoginRequest {
  userName: string;
  password: string;
}
export interface IUser {
  userId: number;
  userName: string;
  email: string;
  isActive: boolean;
}
export interface IPermission {
  permissionId: string;
  code: string;
  type: string;
}
export interface IRole {
  roleId: number;
  roleName: string;
  description: string;
}
export interface IPermissionsResponse {
  user: IUser;
  userRoles: IRole[];
  permissions: IPermission[];
}

export interface IMenu {
  id: string; // unique key
  label: string; // display name
  icon?: string; // optional bootstrap icon
  iconClass?: string; // optional bootstrap icon class
  route?: string; // navigation path
  order: number; // display order
  isPublic?: boolean; // visible without login
}
