import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'https://api.heyapi.dev/v1/get/hey-api/backend',
  output: { format: 'prettier', lint: 'eslint', path: 'src/services' },
  plugins: [
    {
      name: '@hey-api/client-axios',
      runtimeConfigPath: './src/hey-api.ts',
    },
  ],
})
