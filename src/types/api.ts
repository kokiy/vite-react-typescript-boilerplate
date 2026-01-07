/**
 * API 响应类型
 */

/**
 * 统一响应结构
 */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/**
 * 分页响应数据
 */
export interface PaginationResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 列表响应
 */
export type ListResponse<T = unknown> = ApiResponse<PaginationResponse<T>>;

/**
 * 详情响应
 */
export type DetailResponse<T = unknown> = ApiResponse<T>;

/**
 * 创建/更新响应
 */
export type MutationResponse<T = unknown> = ApiResponse<T>;

/**
 * 删除响应
 */
export type DeleteResponse = ApiResponse<null>;

/**
 * 批量操作响应
 */
export interface BatchOperationResponse {
  successCount: number;
  failCount: number;
  failedIds?: string[];
}
