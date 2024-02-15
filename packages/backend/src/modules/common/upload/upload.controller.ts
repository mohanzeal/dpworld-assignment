import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { imageFrameModule } from '../../image-frames/index.js'
import { Types } from 'mongoose'
import { videStreamsModule } from '../../video-streams/index.js'

// upload images
export const uploadFiles = async (req: Request, res: Response) => {
  if (!req.files) {
    return res.send({
      success: false,
    })
  } else {
    const files = req.files as any
    const userId = req.body.userId
    const images = files.image

    if (files && userId && images && images.length > 0) {
      const imagePath = `/files/${images[0]['filename']}`
      // save image
      const createdImage = await imageFrameModule.model.ImageFrames.create({
        _id: new Types.ObjectId(),
        path: imagePath,
        userId: userId,
      })
      return res.send({
        success: true,
        image: createdImage,
      })
    }

    const videos = files.video
    if (files && userId && videos && videos.length > 0) {
      const videoPath = `/files/${videos[0]['filename']}`
      // save image
      const createdVideo = await videStreamsModule.model.VideoStreams.create({
        _id: new Types.ObjectId(),
        path: videoPath,
        userId: userId,
      })
      return res.send({
        success: true,
        image: createdVideo,
      })
    }

    return res.send({
      success: false,
      video: null,
    })
  }
}

export const removeFiles = async (req: Request, res: Response) => {
  if (req.params.fileName) {
    try {
      const removeFilePath = path.join(
        __dirname,
        '../../uploads/',
        req.params.fileName
      )
      fs.unlinkSync(removeFilePath)
      return res.send({
        success: true,
        removed: req.file,
      })
    } catch (e) {
      console.log(e)
      return res.send({
        success: false,
        msg: 'unable to delete file ',
      })
    }
  } else {
    return res.send({
      success: false,
      msg: 'unable to delete file ',
    })
  }
}

export const getFiles = async (req: Request, res: Response) => {
  if (req.params.fileName) {
    try {
      const filePath = path.join(
        __dirname,
        '../../uploads/',
        req.params.fileName
      )

      return res.sendFile(filePath)
    } catch (e) {
      console.log(e)
      return res.send({
        success: false,
        msg: 'unable to send file ',
      })
    }
  } else {
    return res.send({
      success: false,
      msg: 'unable to delete file ',
    })
  }
}
