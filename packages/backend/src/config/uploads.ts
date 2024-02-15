import multer from 'multer'
import { slugify } from '../utils/helpers.js'
import path from 'path'
import fs from 'fs'

export const fileExists = (filePath: string) => {
  try {
    return fs.statSync(filePath).isFile()
  } catch (e) {
    return false
  }
}

const uploadDir = './uploads/'
const diskStorage = multer.diskStorage({
  destination: uploadDir,
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname)
    const fileBase = path.basename(file.originalname, fileExtension)
    let fileSlug = slugify(fileBase) + fileExtension

    // ensure file name is unique by adding a counter suffix if the file exists
    let fileCounter = 0
    while (fileExists(path.join(uploadDir, fileSlug))) {
      fileCounter += 1
      fileSlug = slugify(fileBase) + '-' + fileCounter + fileExtension
    }

    cb(null, fileSlug)
  },
})

export const uploadFiles = multer({
  storage: diskStorage,
})
