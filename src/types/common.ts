/**
 * 通用类型定义
 */

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 排序参数
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'ascend' | 'descend';
}

/**
 * 列表查询参数基类
 */
export interface ListParams extends PaginationParams, SortParams {
  keyword?: string;
}

/**
 * ID 参数
 */
export interface IdParams {
  id: string;
}

/**
 * 时间范围参数
 */
export interface TimeRangeParams {
  startTime?: string;
  endTime?: string;
}

/**
 * 选项类型（用于下拉框等）
 */
export interface Option<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * 树形节点类型
 */
export interface TreeNode<T = unknown> {
  id: string;
  name: string;
  parentId?: string | null;
  children?: TreeNode<T>[];
  data?: T;
}

/**
 * 上传文件类型
 */
export interface UploadFile {
  uid: string;
  name: string;
  url: string;
  size: number;
  type: string;
  status?: 'uploading' | 'done' | 'error';
}
