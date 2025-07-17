import type { CreateClientConfig } from './services/client.gen'

export const createClientConfig: CreateClientConfig = config => ({
  ...config,
  baseURL: 'https://example.com',
})
