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
