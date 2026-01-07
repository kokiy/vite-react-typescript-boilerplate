import { HttpResponse, http } from 'msw';

import type { CreateContentDto } from '@/types/content';

import { mockContents } from '../data/contents';
import { mockTags } from '../data/tags';

/**
 * 内容管理 Mock Handlers
 */
const contentHandlers = [
  // 获取内容列表
  http.get('/api/contents', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 10;
    const keyword = url.searchParams.get('keyword') || '';
    const status = url.searchParams.get('status') || '';

    // 筛选
    let filteredContents = [...mockContents];
    if (keyword) {
      filteredContents = filteredContents.filter(
        item =>
          item.title.includes(keyword) ||
          item.excerpt?.includes(keyword) ||
          item.content.includes(keyword),
      );
    }
    if (status) {
      filteredContents = filteredContents.filter(
        item => item.status === status,
      );
    }

    // 分页
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = filteredContents.slice(start, end);

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: {
        data,
        total: filteredContents.length,
        page,
        pageSize,
      },
    });
  }),

  // 获取内容详情
  http.get('/api/contents/:id', ({ params }) => {
    const { id } = params;
    const content = mockContents.find(item => item.id === id);

    if (!content) {
      return HttpResponse.json(
        { code: 404, message: '内容不存在', data: undefined },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: content,
    });
  }),

  // 创建内容
  http.post('/api/contents', async ({ request }) => {
    const body = (await request.json()) as CreateContentDto;

    // 将标签 ID 转换为完整的标签对象
    const tags = body.tags
      ? mockTags
          .filter(tag => body.tags?.includes(tag.id))
          .map(tag => ({
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
          }))
      : [];

    const newContent = {
      id: String(Date.now()),
      ...body,
      status: body.status || 'draft',
      tags,
      author: {
        id: '1',
        username: 'admin',
        nickname: '超级管理员',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      },
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockContents.unshift(newContent);

    return HttpResponse.json({
      code: 200,
      message: '创建成功',
      data: newContent,
    });
  }),

  // 更新内容
  http.put('/api/contents/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as CreateContentDto;
    const index = mockContents.findIndex(item => item.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '内容不存在', data: undefined },
        { status: 404 },
      );
    }

    // 将标签 ID 转换为完整的标签对象
    const tags = body.tags
      ? mockTags
          .filter(tag => body.tags?.includes(tag.id))
          .map(tag => ({
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
          }))
      : mockContents[index].tags;

    mockContents[index] = {
      ...mockContents[index],
      ...body,
      tags,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json({
      code: 200,
      message: '更新成功',
      data: mockContents[index],
    });
  }),

  // 删除内容
  http.delete('/api/contents/:id', ({ params }) => {
    const { id } = params;
    const index = mockContents.findIndex(item => item.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '内容不存在', data: undefined },
        { status: 404 },
      );
    }

    mockContents.splice(index, 1);

    return HttpResponse.json({
      code: 200,
      message: '删除成功',
      data: undefined,
    });
  }),
];

export default contentHandlers;
