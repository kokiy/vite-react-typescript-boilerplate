/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.info(`current env: ${mode}`);
  console.info(JSON.stringify(env, null, 2));
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.tsx', '.ts', '.json'],
    },
    server: {
      open: true,
      proxy: {
        // 把 /api 开头的请求代理到 http://localhost:8080
        '/api': {
          target: 'http://127.0.0.1:8888',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, ''), // 可选：去掉 /api 前缀
        },
      },
    },
    plugins: [
      react(),
      checker({
        typescript: {
          tsconfigPath: './tsconfig.app.json',
        },
        stylelint: {
          lintCommand: 'stylelint "src/**/*.css"',
        },
      }),
    ],
    define: {},
    test: {
      globals: true,
      testTimeout: 50000,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/services/**/*'],
        provider: 'istanbul',
        reporter: ['text', 'html', 'clover', 'lcov', 'json'],
        enabled: true,
      },
    },
  };
});
