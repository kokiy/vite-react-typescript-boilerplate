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
      partialize: state => ({ locale: state.locale }),
      version: 0,
    },
  ),
);

const storeSelector = createSelectors(useStore);

export { storeSelector, useStore };
