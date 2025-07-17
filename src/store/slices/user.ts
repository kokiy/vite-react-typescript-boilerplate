import type { StateCreator } from 'zustand'

export type IUserSlice = {
  name: string
  setName: (name: string) => void
}
const createUserSlice: StateCreator<IUserSlice> = set => ({
  name: 'koki',
  setName: name => set(() => ({ name })),
})
export default createUserSlice
