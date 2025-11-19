/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.info(`current env: ${mode}`);
  console.info(JSON.stringify(env, null, 2));
  return {
    css: {
      modules: {
        scopeBehaviour: 'local', // default，局部作用域
        generateScopedName: '[name]__[local]___[hash:base64:5]', // 类名生成规则
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.tsx', '.ts', '.json'],
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        fileName: (_, entryName) => `${entryName}.js`,
        formats: ['es'],
      },
      cssCodeSplit: true,
      sourcemap: false,
      minify: false,
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react-dom/client',
        ],
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        },
        plugins: [
          postcss({
            extract: true,
            minimize: true,
            modules: false,
          }),
        ],
      },
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

      dts({
        insertTypesEntry: true,
        outDir: 'dist',
        tsconfigPath: './tsconfig.app.json',
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
