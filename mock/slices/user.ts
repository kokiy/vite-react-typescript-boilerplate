import { HttpResponse, http } from 'msw';

import type { CreateUserDto } from '@/types/user';

import { mockUsers } from '../data/users';

/**
 * 用户管理 Mock Handlers
 */
const userHandlers = [
  // 获取用户列表
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 10;
    const keyword = url.searchParams.get('keyword') || '';
    const role = url.searchParams.get('role') || '';
    const status = url.searchParams.get('status') || '';

    // 筛选
    let filteredUsers = [...mockUsers];
    if (keyword) {
      filteredUsers = filteredUsers.filter(
        user =>
          user.username.includes(keyword) ||
          user.email.includes(keyword) ||
          user.nickname?.includes(keyword),
      );
    }
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }
    if (status) {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }

    // 分页
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = filteredUsers.slice(start, end);

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: {
        data,
        total: filteredUsers.length,
        page,
        pageSize,
      },
    });
  }),

  // 获取用户详情
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    const user = mockUsers.find(item => item.id === id);

    if (!user) {
      return HttpResponse.json(
        { code: 404, message: '用户不存在', data: undefined },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: user,
    });
  }),

  // 创建用户
  http.post('/api/users', async ({ request }) => {
    const body = (await request.json()) as CreateUserDto;
    const newUser = {
      id: String(Date.now()),
      ...body,
      nickname: body.nickname || body.username,
      status: 'active' as const,
      permissions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.unshift(newUser);

    return HttpResponse.json({
      code: 200,
      message: '创建成功',
      data: newUser,
    });
  }),

  // 更新用户
  http.put('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;
    const index = mockUsers.findIndex(item => item.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '用户不存在', data: undefined },
        { status: 404 },
      );
    }

    mockUsers[index] = {
      ...mockUsers[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json({
      code: 200,
      message: '更新成功',
      data: mockUsers[index],
    });
  }),

  // 删除用户
  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    const index = mockUsers.findIndex(item => item.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '用户不存在', data: undefined },
        { status: 404 },
      );
    }

    mockUsers.splice(index, 1);

    return HttpResponse.json({
      code: 200,
      message: '删除成功',
      data: undefined,
    });
  }),
];

export default userHandlers;
