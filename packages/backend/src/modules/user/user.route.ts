import { Router } from 'express'
import * as userController from './user.controller.js'

const router = Router()

export const USER_BASE_ROUTE = '/user'

router.get('/all', userController.getAllUsers)
router.get('/images/:userId', userController.getImagesByUserId)
router.get('/videos/:userId', userController.getVideosByUserId)
router.get('/auditlog/:userId', userController.getUserAuditLog)
router.post('/audit', userController.updateUserActions)

export const userRoutes = router
