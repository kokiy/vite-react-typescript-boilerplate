/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.info(`current env: ${mode}`)
  console.info(JSON.stringify(env, null, 2))
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.tsx', '.ts', '.json'],
    },
    plugins: [
      react(),
      checker({
        typescript: {
          tsconfigPath: './tsconfig.app.json',
        },
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint',
        },
        stylelint: {
          lintCommand: 'stylelint "src/**/*.css"',
        },
      }),
    ],
    define: {},
    test: {
      testTimeout: 50000,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        include: ['src/**/*.{ts,tsx}'],
        provider: 'istanbul',
        reporter: ['text', 'html', 'clover', 'lcov', 'json'],
        enabled: true,
      },
    },
  }
})
