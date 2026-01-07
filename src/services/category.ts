import type { Category, CategoryListParams, CreateCategoryDto, UpdateCategoryDto } from '@/types/category';
import type { PaginationResponse } from '@/types/api';
import { get, post, put } from '@/utils/request';
import { delete as deleteRequest } from '@/utils/request';

/**
 * 分类管理 API
 */
export const categoryService = {
  /**
   * 获取分类列表
   */
  getList: (params: CategoryListParams) =>
    get<PaginationResponse<Category>>('/categories', { params }),

  /**
   * 获取分类树
   */
  getTree: () => get<Category[]>('/categories/tree'),

  /**
   * 获取分类详情
   */
  getById: (id: string) => get<Category>(`/categories/${id}`),

  /**
   * 创建分类
   */
  create: (data: CreateCategoryDto) => post<Category>('/categories', data),

  /**
   * 更新分类
   */
  update: (id: string, data: UpdateCategoryDto) =>
    put<Category>(`/categories/${id}`, data),

  /**
   * 删除分类
   */
  delete: (id: string) => deleteRequest(`/categories/${id}`),
};
