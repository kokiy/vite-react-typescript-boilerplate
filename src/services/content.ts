import type {
  Content,
  ContentListParams,
  CreateContentDto,
  UpdateContentDto,
} from '@/types/content';
import type { PaginationResponse } from '@/types/api';
import { get, post, put } from '@/utils/request';
import { delete as deleteRequest } from '@/utils/request';

/**
 * 内容管理 API
 */
export const contentService = {
  /**
   * 获取内容列表
   */
  getList: (params: ContentListParams) =>
    get<PaginationResponse<Content>>('/contents', { params }),

  /**
   * 获取内容详情
   */
  getById: (id: string) => get<Content>(`/contents/${id}`),

  /**
   * 创建内容
   */
  create: (data: CreateContentDto) => post<Content>('/contents', data),

  /**
   * 更新内容
   */
  update: (id: string, data: UpdateContentDto) =>
    put<Content>(`/contents/${id}`, data),

  /**
   * 删除内容
   */
  delete: (id: string) => deleteRequest(`/contents/${id}`),

  /**
   * 批量删除
   */
  batchDelete: (ids: string[]) => post('/contents/batch/delete', { ids }),

  /**
   * 批量发布
   */
  batchPublish: (ids: string[]) => post('/contents/batch/publish', { ids }),
};
