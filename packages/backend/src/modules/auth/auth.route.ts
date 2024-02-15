import { Router } from 'express'
import { authByPassportJwt } from '../../middlewares/auth.middleware.js'
import * as authController from './auth.controller.js'
import { AuthProvider } from '../../types/index.js'
import passport from 'passport'
import env from '../../config/env.js'

const router = Router()

export const AUTH_BASE_ROUTE = '/auth'

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/me', authByPassportJwt, authController.me)

// redirects to google consent screen
// where user will choose an account to login
// in google ui
router.get('/oauth/google', authController.initiateGoogleOAuth)

router.get(
  '/oauth/google/callback',
  passport.authenticate(AuthProvider.GOOGLE, {
    session: false,
    failureRedirect: `${env.appDomain}/talent/#/login?google=false`,
  }),
  authController.handleGoogleOAuthRedirect
)

router.get('/oauth/linkedin', authController.initiateLinkedinOAuth)

router.get(
  '/oauth/linkedin/callback',
  passport.authenticate(AuthProvider.LINKEDIN, {
    session: false,
    failureRedirect: `${env.appDomain}/talent/#/login?linkedin=false`,
  }),
  authController.handleLinkedinOAuthRedirect
)
export const authRoutes = router
