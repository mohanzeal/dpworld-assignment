import { UserRole } from '../../types/index.js'
import { Router } from 'express'
import { authByPassportJwt } from '../../middlewares/auth.middleware.js'
import * as authController from './auth.controller.js'

const router = Router()

export const AUTH_BASE_ROUTE = '/auth'

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/me', authByPassportJwt, authController.me)

// router.get('/reset-password', usersController.getUserById)

export const authRoutes = router
