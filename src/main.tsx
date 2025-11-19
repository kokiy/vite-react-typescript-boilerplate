import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { start } from '../mock/browser';

import App from './app';

await start();

const rootElement = document.querySelector('#root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
