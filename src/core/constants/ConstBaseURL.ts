import { env } from '~/config/env'

const mapApiUrl = {
  development: 'http://localhost:8000/v1',
  staging: 'https://api-sandbox.example.com/v1',
  production: 'https://api.example.com/v1',
}

// @ts-expect-error
const BASE_API_URL = mapApiUrl[env.URL_ENV]

// @ts-expect-error
const BASE_API_FILE = mapApiUrl[env.URL_ENV].replace('/v1', '')

export { BASE_API_FILE, BASE_API_URL }
