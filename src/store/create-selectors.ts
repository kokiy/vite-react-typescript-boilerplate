// oxlint-disable id-length
import type { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  type State = ReturnType<S['getState']>;
  const store = _store as WithSelectors<typeof _store>;
  store.use = {} as { [K in keyof State]: () => State[K] };
  for (const k of Object.keys(store.getState())) {
    // oxlint-disable-next-line no-explicit-any
    (store.use as any)[k] = () => store(s => s[k as keyof typeof s]);
  }
  return store;
};
