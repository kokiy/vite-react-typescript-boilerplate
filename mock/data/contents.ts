import type { Content } from '@/types/content';

/**
 * Mock 内容数据
 */
export const mockContents: Content[] = [
  {
    id: '1',
    title: 'React 19 新特性详解',
    content: '# React 19 新特性\n\nReact 19 带来了许多令人兴奋的新特性...',
    excerpt:
      'React 19 带来了许多令人兴奋的新特性，包括 Server Components、Actions 等',
    coverImage: 'https://picsum.photos/seed/react19/800/400',
    status: 'published',
    categoryId: '1',
    category: { id: '1', name: '前端开发', slug: 'frontend' },
    tags: [
      { id: '1', name: 'React', slug: 'react' },
      { id: '2', name: 'JavaScript', slug: 'javascript' },
    ],
    author: {
      id: '1',
      username: 'admin',
      nickname: '超级管理员',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
    viewCount: 1234,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-02T15:30:00Z',
    publishedAt: '2024-01-02T15:30:00Z',
  },
  {
    id: '2',
    title: 'TypeScript 5.0 实战指南',
    content: '# TypeScript 5.0\n\n本文将介绍 TypeScript 5.0 的新特性...',
    excerpt: 'TypeScript 5.0 带来了更强大的类型系统和更好的性能',
    coverImage: 'https://picsum.photos/seed/ts5/800/400',
    status: 'published',
    categoryId: '1',
    category: { id: '1', name: '前端开发', slug: 'frontend' },
    tags: [
      { id: '3', name: 'TypeScript', slug: 'typescript' },
      { id: '2', name: 'JavaScript', slug: 'javascript' },
    ],
    author: {
      id: '2',
      username: 'editor',
      nickname: '编辑',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=editor',
    },
    viewCount: 856,
    createdAt: '2024-01-03T09:00:00Z',
    updatedAt: '2024-01-03T14:20:00Z',
    publishedAt: '2024-01-03T14:20:00Z',
  },
  {
    id: '3',
    title: 'Vite 构建优化实践',
    content: '# Vite 构建优化\n\n如何优化 Vite 项目的构建性能...',
    excerpt: '分享一些 Vite 项目的构建优化技巧',
    status: 'draft',
    categoryId: '1',
    category: { id: '1', name: '前端开发', slug: 'frontend' },
    tags: [{ id: '4', name: 'Vite', slug: 'vite' }],
    author: {
      id: '1',
      username: 'admin',
      nickname: '超级管理员',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
    viewCount: 0,
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-05T11:00:00Z',
  },
];
