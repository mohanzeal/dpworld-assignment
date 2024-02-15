import express, { Application } from 'express'
import passport from 'passport'

import { allowCros } from './config/cors.js'
import { authModule } from './modules/auth/index.js'

// initialize mongoose database connection
import './config/mongoose.js'
import './config/oauth/passport.js'
import env from './config/env.js'

const app: Application = express()
// app cors
app.use(allowCros)

// Body parsing Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())

// api routes

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
