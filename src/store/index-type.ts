import type { AuthSlice } from './slices/auth';
import type { IGlobalSlice } from './slices/global';
import type { PermissionSlice } from './slices/permission';
import type { IUserSlice } from './slices/user';

export type GlobalState = IGlobalSlice &
  IUserSlice &
  AuthSlice &
  PermissionSlice;
