import { useCallback, useEffect, useState } from 'react';

import viteLogo from '@/assets/vite.svg';
import RouterComponent from '@/router';

import './app.css';
import reactLogo from './assets/react.svg';

let initialCount = 0;
const oneStep = 1;

const App = () => {
  const [count, setCount] = useState(initialCount);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-r1:8b',
        prompt: 'Why is the sky blue?',
        stream: true,
      }),
    })
      .then(async res => {
        if (res.body) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder('utf8');

          while (true) {
            // oxlint-disable-next-line no-await-in-loop
            const { done, value } = await reader.read();
            if (done) {
              break;
            }

            const chunk = JSON.parse(decoder.decode(value));

            setMessage(prev => prev + chunk.response);
          }
        }
      })
      .catch(console.error);
  }, []);

  const handleBtnClick = useCallback(
    () => setCount(count => count + oneStep),
    [],
  );

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={handleBtnClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="message-wrap">{message}</p>
      <RouterComponent />
    </>
  );
};

export default App;
