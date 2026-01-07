/**
 * 用户相关类型定义
 */

/**
 * 用户角色
 */
type UserRole = 'super_admin' | 'admin' | 'editor' | 'viewer';

/**
 * 用户状态
 */
type UserStatus = 'active' | 'inactive' | 'banned';

/**
 * 用户信息
 */
interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  nickname?: string;
  role: UserRole;
  status: UserStatus;
  permissions?: string[];
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

/**
 * 登录参数
 */
interface LoginParams {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * 登录响应
 */
interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}

/**
 * 创建用户参数
 */
interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  nickname?: string;
  role: UserRole;
  avatar?: string;
}

/**
 * 更新用户参数
 */
interface UpdateUserDto {
  email?: string;
  nickname?: string;
  avatar?: string;
  role?: UserRole;
  status?: UserStatus;
}

/**
 * 修改密码参数
 */
interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

/**
 * 用户列表查询参数
 */
interface UserListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  role?: UserRole;
  status?: UserStatus;
}

export type {
  UserRole,
  UserStatus,
  User,
  LoginParams,
  LoginResponse,
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  UserListParams,
};
