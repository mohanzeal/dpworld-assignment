import express, { Application } from 'express'
import passport from 'passport'
import path from 'path'
import { fileURLToPath } from 'url'

import { allowCros } from './config/cors.js'
import { authModule } from './modules/auth/index.js'

// initialize mongoose database connection
import './config/mongoose.js'
import './config/oauth/passport.js'
import env from './config/env.js'
import { uploadModule } from './modules/common/upload/index.js'
import { userModule } from './modules/user/index.js'

const app: Application = express()
// app cors
app.use(allowCros)

// Body parsing Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/files', express.static(path.join(__dirname, '../uploads')))

// api routes

app.use(
  env.apiBase + userModule.route.USER_BASE_ROUTE,
  userModule.route.userRoutes
)

app.use(
  env.apiBase + uploadModule.route.UPLOAD_BASE_ROUTE,
  uploadModule.route.uploadRoutes
)

app.use(
  env.apiBase + authModule.route.AUTH_BASE_ROUTE,
  authModule.route.authRoutes
)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.error('no route caught this url: ' + req.url)
  return next()
})

try {
  app.listen(env.port, (): void => {
    console.log(`Connected successfully on port ${env.port}`)
  })
} catch (error) {
  console.error(`Error occured: ` + error)
}

export default app
