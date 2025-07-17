import type { StateCreator } from 'zustand'

export type IIntl = 'en-us' | 'zh-cn' | 'zh-hk'
export type IGlobalSlice = {
  locale: IIntl
  setLocale: (locale: IIntl) => void
  errorCode: string
  setErrorCode: (errorCode: string) => void
}
const createGlobalSlice: StateCreator<IGlobalSlice> = set => ({
  locale: 'en-us',
  errorCode: '',
  setLocale: locale => set(() => ({ locale })),
  setErrorCode: errorCode => set(() => ({ errorCode })),
})
export default createGlobalSlice
