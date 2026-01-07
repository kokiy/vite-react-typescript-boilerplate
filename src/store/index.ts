import { each } from 'lodash-es';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createSelectors } from './create-selectors';
import storeSlice from './index-slices';
import type { GlobalState } from './index-type';

const useStore = create<GlobalState>()(
  persist(
    (...params) => {
      let storeSliceMap = {} as GlobalState;
      each(Object.values(storeSlice), slice => {
        storeSliceMap = { ...storeSliceMap, ...slice(...params) };
      });
      return storeSliceMap;
    },
    {
      name: 'kokiSessionStore',
      storage: createJSONStorage(() => sessionStorage),
      //  skipHydration: true,
      partialize: state => ({
        locale: state.locale,
        // 持久化认证相关状态
        token: state.token,
        userInfo: state.userInfo,
        isAuthenticated: state.isAuthenticated,
        // 持久化权限
        permissions: state.permissions,
      }),
      version: 0,
    },
  ),
);

const storeSelector = createSelectors(useStore) as typeof useStore & {
  use: {
    [K in keyof GlobalState]: () => GlobalState[K];
  };
};

export { storeSelector, useStore };
