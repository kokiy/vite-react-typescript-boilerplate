import type { StateCreator } from 'zustand';

import type { User } from '@/types/user';

/**
 * 认证状态 Slice
 * 状态会通过 zustand persist 中间件自动持久化到 localStorage/sessionStorage
 */
const createAuthSlice: StateCreator<AuthSlice> = set => ({
  token: undefined,
  userInfo: undefined,
  isAuthenticated: false,

  login: (token, userInfo) => {
    set({
      token,
      userInfo,
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      token: undefined,
      userInfo: undefined,
      isAuthenticated: false,
    });
  },

  updateUserInfo: userInfo => {
    set({ userInfo });
  },
});

export interface AuthSlice {
  token: string | undefined;
  userInfo: User | undefined;
  isAuthenticated: boolean;
  login: (token: string, userInfo: User) => void;
  logout: () => void;
  updateUserInfo: (userInfo: User) => void;
}

export default createAuthSlice;
