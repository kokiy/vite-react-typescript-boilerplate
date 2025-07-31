import type { StateCreator } from 'zustand';

const createGlobalSlice: StateCreator<IGlobalSlice> = set => ({
  locale: 'en-us',
  errorCode: '',
  setLocale: locale => set(() => ({ locale })),
  setErrorCode: errorCode => set(() => ({ errorCode })),
});

type IIntl = 'en-us' | 'zh-cn' | 'zh-hk';
interface IGlobalSlice {
  locale: IIntl;
  setLocale: (locale: IIntl) => void;
  errorCode: string;
  setErrorCode: (errorCode: string) => void;
}
export default createGlobalSlice;

export type { IIntl, IGlobalSlice };
