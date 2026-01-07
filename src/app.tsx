import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/lib/query-client';
import RouterComponent from '@/router';

import './app.css';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterComponent />
      {/* React Query DevTools - 仅在开发环境显示 */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
