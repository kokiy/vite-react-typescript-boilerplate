import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { start } from '../mock/browser';

import App from './app';
import './index.css';

start()
  .then(() => {
    console.info('Mock Service Worker started');
    const rootElement = document.querySelector('#root');
    if (rootElement) {
      createRoot(rootElement).render(
        <StrictMode>
          <App />
        </StrictMode>,
      );
    }
  })
  .catch(console.error);
