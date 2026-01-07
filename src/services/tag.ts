import type { Tag, TagListParams, CreateTagDto, UpdateTagDto } from '@/types/tag';
import type { PaginationResponse } from '@/types/api';
import { get, post, put } from '@/utils/request';
import { delete as deleteRequest } from '@/utils/request';

/**
 * 标签管理 API
 */
export const tagService = {
  /**
   * 获取标签列表
   */
  getList: (params: TagListParams) =>
    get<PaginationResponse<Tag>>('/tags', { params }),

  /**
   * 获取所有标签
   */
  getAll: () => get<Tag[]>('/tags/all'),

  /**
   * 获取标签详情
   */
  getById: (id: string) => get<Tag>(`/tags/${id}`),

  /**
   * 创建标签
   */
  create: (data: CreateTagDto) => post<Tag>('/tags', data),

  /**
   * 更新标签
   */
  update: (id: string, data: UpdateTagDto) => put<Tag>(`/tags/${id}`, data),

  /**
   * 删除标签
   */
  delete: (id: string) => deleteRequest(`/tags/${id}`),
};
