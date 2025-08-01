import { useCallback, useEffect, useState } from 'react';

import viteLogo from '@/assets/vite.svg';
import RouterComponent from '@/router';
import { getV1Organizations } from '@/services/sdk.gen';

import './app.css';
import reactLogo from './assets/react.svg';

let initialCount = 0;
const oneStep = 1;

function App() {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    console.info('');
    getV1Organizations()
      .then(res => {
        console.info(res);
      })
      .catch(console.error);
  }, [count]);

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
      <RouterComponent />
    </>
  );
}

export default App;
