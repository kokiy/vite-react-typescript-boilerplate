/**
 * React Query Keys
 * 用于标识不同的查询，便于缓存管理和失效
 */

export const queryKeys = {
  // 认证相关
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  // 内容管理相关
  content: {
    all: ['content'] as const,
    lists: () => [...queryKeys.content.all, 'list'] as const,
    list: (params: unknown) => [...queryKeys.content.lists(), params] as const,
    details: () => [...queryKeys.content.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.content.details(), id] as const,
  },

  // 用户管理相关
  user: {
    all: ['user'] as const,
    lists: () => [...queryKeys.user.all, 'list'] as const,
    list: (params: unknown) => [...queryKeys.user.lists(), params] as const,
    details: () => [...queryKeys.user.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.user.details(), id] as const,
  },

  // 媒体管理相关
  media: {
    all: ['media'] as const,
    lists: () => [...queryKeys.media.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.media.lists(), params] as const,
    details: () => [...queryKeys.media.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.media.details(), id] as const,
  },

  // 系统设置相关
  settings: {
    all: ['settings'] as const,
    site: () => [...queryKeys.settings.all, 'site'] as const,
    menu: () => [...queryKeys.settings.all, 'menu'] as const,
  },
} as const;
