import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

import { useStore } from '@/store';

/**
 * 创建 axios 实例
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 请求拦截器
 * 在请求发送前统一添加 token
 */
request.interceptors.request.use(
  config => {
    // 从 zustand store 获取 token
    const token = useStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 * 响应拦截器
 * 统一处理响应和错误
 */
request.interceptors.response.use(
  response => {
    // 如果返回的是包装格式 { code, message, data }，则提取 data
    const result = response.data;
    if (result && typeof result === 'object' && 'data' in result) {
      return result.data;
    }
    // 89
    return result;
  },
  (error: AxiosError<{ message?: string }>) => {
    // 统一错误处理
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401: {
          // 未授权，清除 token 并跳转到登录页
          useStore.getState().logout();
          window.location.href = '/login';
          break;
        }
        case 403: {
          // 无权限
          console.error('403: 无权限访问');
          break;
        }
        case 404: {
          console.error('404: 请求的资源不存在');
          break;
        }
        case 500: {
          console.error('500: 服务器错误');
          break;
        }
        default: {
          console.error(`请求错误: ${response.status}`);
        }
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('网络错误，请检查网络连接');
    } else {
      // 请求配置出错
      console.error('请求配置错误:', error.message);
    }

    return Promise.reject(error);
  },
);

/**
 * 封装 GET 请求
 */
function get<T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request.get(url, config);
}

/**
 * 封装 POST 请求
 */
function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request.post(url, data, config);
}

/**
 * 封装 PUT 请求
 */
function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request.put(url, data, config);
}

/**
 * 封装 DELETE 请求
 */
function del<T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request.delete(url, config);
}

/**
 * 封装 PATCH 请求
 */
function patch<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request.patch(url, data, config);
}

export { del as delete, get, patch, post, put, request };
