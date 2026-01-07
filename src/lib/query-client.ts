import { QueryClient } from '@tanstack/react-query';

/**
 * React Query 配置
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 数据过期时间（5分钟）
      staleTime: 1000 * 60 * 5,
      // 缓存时间（10分钟）
      gcTime: 1000 * 60 * 10,
      // 失败后重试次数
      retry: 1,
      // 重试延迟
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30_000),
      // 窗口聚焦时重新获取数据
      refetchOnWindowFocus: false,
      // 网络重连时重新获取数据
      refetchOnReconnect: true,
    },
    mutations: {
      // mutation 失败后重试次数
      retry: 0,
    },
  },
});
