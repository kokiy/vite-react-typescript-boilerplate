import { HttpResponse, http } from 'msw';

import type { CreateCategoryDto } from '@/types/category';

import { mockCategories } from '../data/categories';

/**
 * 分类管理 Mock Handlers
 */
const categoryHandlers = [
  // 获取分类列表
  http.get('/api/categories', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 10;
    const keyword = url.searchParams.get('keyword') || '';

    let filteredCategories = [...mockCategories];
    if (keyword) {
      filteredCategories = filteredCategories.filter(cat =>
        cat.name.includes(keyword),
      );
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = filteredCategories.slice(start, end);

    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: { data, total: filteredCategories.length, page, pageSize },
    });
  }),

  // 获取分类树
  http.get('/api/categories/tree', () => {
    const buildTree = (parentId: string | null = undefined): any[] => {
      return mockCategories
        .filter(cat => cat.parentId === parentId)
        .map(cat => ({
          ...cat,
          children: buildTree(cat.id),
        }));
    };
    return HttpResponse.json({
      code: 200,
      message: '成功',
      data: buildTree(),
    });
  }),

  // 创建分类
  http.post('/api/categories', async ({ request }) => {
    const body = (await request.json()) as CreateCategoryDto;
    const newCategory = {
      id: String(Date.now()),
      ...body,
      sort: body.sort || 0,
      contentCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCategories.unshift(newCategory);
    return HttpResponse.json({
      code: 200,
      message: '创建成功',
      data: newCategory,
    });
  }),

  // 更新分类
  http.put('/api/categories/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;
    const index = mockCategories.findIndex(item => item.id === id);
    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '分类不存在' },
        { status: 404 },
      );
    }
    mockCategories[index] = {
      ...mockCategories[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json({
      code: 200,
      message: '更新成功',
      data: mockCategories[index],
    });
  }),

  // 删除分类
  http.delete('/api/categories/:id', ({ params }) => {
    const { id } = params;
    const index = mockCategories.findIndex(item => item.id === id);
    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '分类不存在' },
        { status: 404 },
      );
    }
    mockCategories.splice(index, 1);
    return HttpResponse.json({
      code: 200,
      message: '删除成功',
      data: undefined,
    });
  }),
];

export default categoryHandlers;
