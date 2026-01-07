/**
 * 权限相关类型定义
 */

/**
 * 权限代码类型
 */
type PermissionCode = string;

/**
 * 权限项
 */
interface Permission {
  id: string;
  code: PermissionCode;
  name: string;
  description?: string;
  module: string;
}

/**
 * 菜单类型
 */
type MenuType = 'menu' | 'button';

/**
 * 菜单项
 */
interface MenuItem {
  id: string;
  name: string;
  path?: string;
  icon?: string;
  type: MenuType;
  permission?: PermissionCode;
  parentId?: string | null;
  sort: number;
  children?: MenuItem[];
  hidden?: boolean;
}

/**
 * 路由配置
 */
interface RouteConfig {
  path: string;
  component?: string;
  permission?: PermissionCode;
  children?: RouteConfig[];
}

export type { PermissionCode, Permission, MenuType, MenuItem, RouteConfig };
