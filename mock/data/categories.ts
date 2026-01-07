import type { Category } from '@/types/category';

/**
 * Mock 分类数据
 */
export const mockCategories: Category[] = [
  {
    id: '1',
    name: '前端开发',
    slug: 'frontend',
    description: '前端开发相关技术',
    parentId: undefined,
    sort: 1,
    contentCount: 10,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'React',
    slug: 'react',
    description: 'React 框架相关',
    parentId: '1',
    sort: 1,
    contentCount: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Vue',
    slug: 'vue',
    description: 'Vue 框架相关',
    parentId: '1',
    sort: 2,
    contentCount: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: '后端开发',
    slug: 'backend',
    description: '后端开发相关技术',
    parentId: undefined,
    sort: 2,
    contentCount: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
