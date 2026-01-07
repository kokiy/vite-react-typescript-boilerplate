import type { StateCreator } from 'zustand';

import type { MenuItem } from '@/types/permission';
import { ROLE_PERMISSIONS } from '@/utils/constants';

/**
 * 权限状态 Slice
 */
const createPermissionSlice: StateCreator<PermissionSlice> = (set, get) => ({
  permissions: [],
  menus: [],

  setPermissions: permissions => set({ permissions }),

  setMenus: menus => set({ menus }),

  hasPermission: permission => {
    const { permissions } = get();
    return permissions.includes(permission);
  },

  hasAnyPermission: permissionList => {
    const { permissions } = get();
    return permissionList.some(p => permissions.includes(p));
  },

  hasAllPermissions: permissionList => {
    const { permissions } = get();
    return permissionList.every(p => permissions.includes(p));
  },

  initPermissions: userRole => {
    const permissions = ROLE_PERMISSIONS[userRole] || [];
    set({ permissions });
  },
});

export interface PermissionSlice {
  permissions: string[];
  menus: MenuItem[];
  setPermissions: (permissions: string[]) => void;
  setMenus: (menus: MenuItem[]) => void;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  initPermissions: (userRole: string) => void;
}

export default createPermissionSlice;
