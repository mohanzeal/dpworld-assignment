import { UserFields } from '../../types/index.js'
import mongoose, { Schema } from 'mongoose'

export const ImageFrame = new Schema<any>(
  {
    _id: { type: Schema.Types.ObjectId },
    path: { type: String, required: true, default: '' },
    userId: {
      // referenece to user object
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    [UserFields.IS_DELETED]: {
      type: Boolean,
      required: false,
      default: false,
    },
    [UserFields.CREATED_AT]: {
      type: Date,
      default: Date.now,
    },
    [UserFields.UPDATED_AT]: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

ImageFrame.pre('save', async function save(next) {
  try {
    if (!this.updatedAt) {
      this.updatedAt = Date.now()
    }

    return next()
  } catch (error) {
    return next(error as Error)
  }
})

export const ImageFrames = mongoose.model<any>('image_frames', ImageFrame)
