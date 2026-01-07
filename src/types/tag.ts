/**
 * 标签相关类型定义
 */

/**
 * 标签
 */
interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  contentCount?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 标签列表查询参数
 */
interface TagListParams {
  page: number;
  pageSize: number;
  keyword?: string;
}

/**
 * 创建标签参数
 */
interface CreateTagDto {
  name: string;
  slug: string;
  color?: string;
}

/**
 * 更新标签参数
 */
type UpdateTagDto = Partial<CreateTagDto>;

export type { Tag, TagListParams, CreateTagDto, UpdateTagDto };
