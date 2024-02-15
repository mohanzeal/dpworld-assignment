import { Router } from 'express'
import { uploadFiles } from '../../../config/uploads.js'
import * as uploadController from './upload.controller.js'

const router = Router()

export const UPLOAD_BASE_ROUTE = '/upload'

router.get('/:fileName', uploadController.getFiles)
router.post(
  '',
  uploadFiles.fields([{ name: 'image' }, { name: 'video' }]),
  uploadController.uploadFiles
)

export const uploadRoutes = router
