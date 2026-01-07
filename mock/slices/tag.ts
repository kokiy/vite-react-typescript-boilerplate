import { HttpResponse, http } from 'msw';

import type { CreateTagDto } from '@/types/tag';

import { mockTags } from '../data/tags';

/**
 * 标签管理 Mock Handlers
 */
const tagHandlers = [
  // 获取标签列表
  http.get('/api/tags', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 10;
    const keyword = url.searchParams.get('keyword') || '';

    let filteredTags = [...mockTags];
    if (keyword) {
      filteredTags = filteredTags.filter(tag => tag.name.includes(keyword));
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = filteredTags.slice(start, end);

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: { data, total: filteredTags.length, page, pageSize },
    });
  }),

  // 获取所有标签
  http.get('/api/tags/all', () => {
    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: mockTags,
    });
  }),

  // 创建标签
  http.post('/api/tags', async ({ request }) => {
    const body = (await request.json()) as CreateTagDto;
    const newTag = {
      id: String(Date.now()),
      ...body,
      contentCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTags.unshift(newTag);
    return HttpResponse.json({ code: 200, message: '创建成功', data: newTag });
  }),

  // 更新标签
  http.put('/api/tags/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;
    const index = mockTags.findIndex(item => item.id === id);
    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '标签不存在' },
        { status: 404 },
      );
    }
    mockTags[index] = {
      ...mockTags[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json({
      code: 200,
      message: '更新成功',
      data: mockTags[index],
    });
  }),

  // 删除标签
  http.delete('/api/tags/:id', ({ params }) => {
    const { id } = params;
    const index = mockTags.findIndex(item => item.id === id);
    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '标签不存在' },
        { status: 404 },
      );
    }
    mockTags.splice(index, 1);
    return HttpResponse.json({
      code: 200,
      message: '删除成功',
      data: undefined,
    });
  }),
];

export default tagHandlers;
