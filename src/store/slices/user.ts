import type { StateCreator } from 'zustand';

const createUserSlice: StateCreator<IUserSlice> = set => ({
  name: 'koki',
  setName: name => set(() => ({ name })),
});

export interface IUserSlice {
  name: string;
  setName: (name: string) => void;
}
export default createUserSlice;
