import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { start } from '../mocks/browser'

import App from './App.tsx'
import './index.css'

start().then(() => {
  console.info('Mock Service Worker started')
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
