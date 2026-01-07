import { HttpResponse, http } from 'msw';

import type { LoginParams } from '@/types/user';

import { findUserByUsername, validateUserPassword } from '../data/users';

/**
 * 认证相关 Mock Handlers
 */
const authHandlers = [
  // 登录
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as LoginParams;
    const { username, password } = body;

    // 查找用户
    const user = findUserByUsername(username);

    // 验证用户名和密码
    if (!user || !validateUserPassword(username, password)) {
      return HttpResponse.json(
        {
          code: 401,
          message: '用户名或密码错误',
          data: undefined,
        },
        { status: 401 },
      );
    }

    // 检查用户状态
    if (user.status !== 'active') {
      return HttpResponse.json(
        {
          code: 403,
          message: '账号已被禁用',
          data: undefined,
        },
        { status: 403 },
      );
    }

    // 生成 mock token
    const token = `mock-token-${user.id}-${Date.now()}`;

    // 更新最后登录时间
    user.lastLoginAt = new Date().toISOString();

    return HttpResponse.json({
      code: 200,
      message: '登录成功',
      data: {
        token,
        user,
        expiresIn: 7200, // 2 小时
      },
    });
  }),

  // 登出
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({
      code: 200,
      message: '登出成功',
      data: undefined,
    });
  }),

  // 刷新 token
  http.post('/api/auth/refresh', () => {
    const newToken = `mock-token-refresh-${Date.now()}`;
    return HttpResponse.json({
      code: 200,
      message: '刷新成功',
      data: {
        token: newToken,
      },
    });
  }),

  // 获取当前用户信息
  http.post('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          code: 401,
          message: '未授权',
          data: undefined,
        },
        { status: 401 },
      );
    }

    // 简化处理，返回 admin 用户（实际应该根据 token 查找）
    const user = findUserByUsername('admin');

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: user,
    });
  }),
];

export default authHandlers;
