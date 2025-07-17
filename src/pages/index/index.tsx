import { storeSelector } from '@/store'

const IndexComponent = () => {
  const locale = storeSelector.use.locale()
  const setLocale = storeSelector.use.setLocale()
  return (
    <div>
      <p>index page {locale}</p>
      <button onClick={() => setLocale('zh-cn')}>切换语言</button>
      <button onClick={() => setLocale('en-us')}>Switch Language</button>
      <button onClick={() => setLocale('zh-hk')}>切換語言</button>
    </div>
  )
}

export default IndexComponent
