/**
 * 应用常量配置
 */

/**
 * 权限定义
 */
export const PERMISSIONS = {
  // 内容管理权限
  CONTENT_VIEW: 'content:view',
  CONTENT_CREATE: 'content:create',
  CONTENT_EDIT: 'content:edit',
  CONTENT_DELETE: 'content:delete',
  CONTENT_PUBLISH: 'content:publish',

  // 媒体管理权限
  MEDIA_VIEW: 'media:view',
  MEDIA_UPLOAD: 'media:upload',
  MEDIA_DELETE: 'media:delete',

  // 用户管理权限
  USER_VIEW: 'user:view',
  USER_CREATE: 'user:create',
  USER_EDIT: 'user:edit',
  USER_DELETE: 'user:delete',

  // 系统设置权限
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_EDIT: 'settings:edit',
} as const;

/**
 * 用户角色
 */
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

/**
 * 角色权限映射
 */
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: [
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.CONTENT_CREATE,
    PERMISSIONS.CONTENT_EDIT,
    PERMISSIONS.CONTENT_DELETE,
    PERMISSIONS.CONTENT_PUBLISH,
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.MEDIA_DELETE,
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_EDIT,
  ],
  [ROLES.EDITOR]: [
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.CONTENT_CREATE,
    PERMISSIONS.CONTENT_EDIT,
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.MEDIA_UPLOAD,
  ],
  [ROLES.VIEWER]: [PERMISSIONS.CONTENT_VIEW, PERMISSIONS.MEDIA_VIEW],
};

/**
 * 内容状态
 */
export const CONTENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

/**
 * 内容状态标签
 */
export const CONTENT_STATUS_LABELS: Record<string, string> = {
  [CONTENT_STATUS.DRAFT]: '草稿',
  [CONTENT_STATUS.PUBLISHED]: '已发布',
  [CONTENT_STATUS.ARCHIVED]: '已归档',
};

/**
 * 内容状态颜色（Ant Design Tag）
 */
export const CONTENT_STATUS_COLORS: Record<string, string> = {
  [CONTENT_STATUS.DRAFT]: 'default',
  [CONTENT_STATUS.PUBLISHED]: 'success',
  [CONTENT_STATUS.ARCHIVED]: 'warning',
};

/**
 * 分页默认配置
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;
