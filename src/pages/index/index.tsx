import { useCallback } from 'react';

import { storeSelector } from '@/store';

const IndexComponent = () => {
  const locale = storeSelector.use.locale();
  const setLocale = storeSelector.use.setLocale();
  const handleBtn1Click = useCallback(() => setLocale('zh-cn'), [setLocale]);
  const handleBtn2Click = useCallback(() => setLocale('en-us'), [setLocale]);
  const handleBtn3Click = useCallback(() => setLocale('zh-hk'), [setLocale]);
  return (
    <div>
      <p>index page {locale}</p>
      <button type="button" onClick={handleBtn1Click}>
        切换语言
      </button>
      <button type="button" onClick={handleBtn2Click}>
        Switch Language
      </button>
      <button type="button" onClick={handleBtn3Click}>
        切換語言
      </button>
    </div>
  );
};

export default IndexComponent;
