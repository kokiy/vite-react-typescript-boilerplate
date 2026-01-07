import type { LoginParams, LoginResponse } from '@/types/user';
import { post } from '@/utils/request';

/**
 * 认证相关 API
 */
export const authService = {
  /**
   * 用户登录
   */
  login: (params: LoginParams) => post<LoginResponse>('/auth/login', params),

  /**
   * 用户登出
   */
  logout: () => post('/auth/logout'),

  /**
   * 刷新 token
   */
  refreshToken: () => post<{ token: string }>('/auth/refresh'),

  /**
   * 获取当前用户信息
   */
  getCurrentUser: () => post('/auth/me'),
};
