import dotenv from 'dotenv'

const loadEnvVariables = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      dotenv.config({ path: '.env.prod' })
      break
    case 'development':
      dotenv.config({ path: '.env.dev' })
      break
    case 'test':
      dotenv.config({ path: '.env.test' })
      break
  }
}

loadEnvVariables()

const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || '4000',
  apiBase: '/api/v1',
  isDev: isDev,
  logDirectory: process.env.LOG_DIR || 'logs',
  db: {
    name: process.env.DB_NAME || 'name',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_USER_PWD || 'password',
  },
  email: {
    fromName: process.env.EMAIL_FROM_NAME,
    fromEmail: process.env.EMAIL_FROM_ADDRESS,
    smtpHost: process.env.EMAIL_SMTP_HOST,
    smtpPort: process.env.EMAIL_SMTP_PORT,
    smtpUser: process.env.EMAIL_SMTP_USER,
    smtpUserPwd: process.env.EMAIL_SMTP_PASS,
  },
  defaultPerPage: '3',
  defaultPage: '1',
  hashSalt: 11,
  jwtSecret: process.env.JWT_SECRET || 'testingsecret',
  jwtExp: process.env.JWT_EXP || '4h',
  cacheDefaultTTL: process.env.CACHE_DEFAULT_TTL || '',
  cacheHeaderName: process.env.CACHE_HEADER_NAME || '',
}
