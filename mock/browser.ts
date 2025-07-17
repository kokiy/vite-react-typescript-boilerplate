import { setupWorker } from 'msw/browser'

import { handlers } from './handlers'

const worker = setupWorker(...handlers)
export const start = async () => {
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: '/mockServiceWorker.js' },
  })
}
