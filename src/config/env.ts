const APP_NAME = process.env.APP_NAME || 'Nextine Admin'
const APP_VERSION = process.env.APP_VERSION || 'v0.0.1'

const URL_ENV = process.env.URL_ENV || 'development'
const BASE_URL = process.env.BASE_URL || 'masb0ymas.com'
const SITE_URL = process.env.SITE_URL || 'https://masb0ymas.com'

const AXIOS_TIMEOUT = process.env.AXIOS_TIMEOUT || '5m'

const LOCAL_STORAGE_SESSION =
  process.env.LOCAL_STORAGE_SESSION || 'token_expresso'

export const env = {
  APP_NAME,
  APP_VERSION,

  URL_ENV,
  BASE_URL,
  SITE_URL,

  AXIOS_TIMEOUT,
  LOCAL_STORAGE_SESSION,
}
