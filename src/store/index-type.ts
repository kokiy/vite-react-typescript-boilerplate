import type { IGlobalSlice } from './slices/global';
import type { IUserSlice } from './slices/user';

export type GlobalState = IGlobalSlice & IUserSlice;
