import type {
  User,
  UserListParams,
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
} from '@/types/user';
import type { PaginationResponse } from '@/types/api';
import { get, post, put } from '@/utils/request';
import { delete as deleteRequest } from '@/utils/request';

/**
 * 用户管理 API
 */
export const userService = {
  /**
   * 获取用户列表
   */
  getList: (params: UserListParams) =>
    get<PaginationResponse<User>>('/users', { params }),

  /**
   * 获取用户详情
   */
  getById: (id: string) => get<User>(`/users/${id}`),

  /**
   * 创建用户
   */
  create: (data: CreateUserDto) => post<User>('/users', data),

  /**
   * 更新用户
   */
  update: (id: string, data: UpdateUserDto) => put<User>(`/users/${id}`, data),

  /**
   * 删除用户
   */
  delete: (id: string) => deleteRequest(`/users/${id}`),

  /**
   * 修改密码
   */
  changePassword: (id: string, data: ChangePasswordDto) =>
    post(`/users/${id}/password`, data),
};
