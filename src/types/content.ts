/**
 * 内容相关类型定义
 */
import type { User } from './user';

/**
 * 内容状态
 */
type ContentStatus = 'draft' | 'published' | 'archived';

/**
 * 内容分类
 */
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
}

/**
 * 内容标签
 */
interface Tag {
  id: string;
  name: string;
  slug: string;
}

/**
 * 内容
 */
interface Content {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  status: ContentStatus;
  categoryId?: string;
  category?: Category;
  tags: Tag[];
  author: Pick<User, 'id' | 'username' | 'nickname' | 'avatar'>;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

/**
 * 内容列表查询参数
 */
interface ContentListParams {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: ContentStatus;
  categoryId?: string;
  authorId?: string;
}

/**
 * 创建内容参数
 */
interface CreateContentDto {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  status?: ContentStatus;
  categoryId?: string;
  tags?: string[];
}

/**
 * 更新内容参数
 */
type UpdateContentDto = Partial<CreateContentDto>;

export type {
  ContentStatus,
  Category,
  Tag,
  Content,
  ContentListParams,
  CreateContentDto,
  UpdateContentDto,
};
