/**
 * 分类相关类型定义
 */

/**
 * 分类
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  sort: number;
  contentCount?: number;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

/**
 * 分类列表查询参数
 */
export interface CategoryListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  parentId?: string;
}

/**
 * 创建分类参数
 */
export interface CreateCategoryDto {
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  sort?: number;
}

/**
 * 更新分类参数
 */
export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}
