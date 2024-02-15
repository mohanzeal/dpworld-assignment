import { IUser, UserFields } from '../../types/index.js'
import mongoose, { Schema } from 'mongoose'

export const UserSchema = new Schema<IUser>(
  {
    [UserFields._ID]: { type: Schema.Types.ObjectId },
    [UserFields.NAME]: { type: String, required: true, default: '' },
    [UserFields.EMAIL]: {
      type: String,
      unique: true,
      required: true,
      default: '',
    },
    [UserFields.PASSWORD]: { type: String, required: true, default: '' },
    [UserFields.DESC]: { type: String, required: false, default: '' },
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

UserSchema.pre('save', async function save(next) {
  try {
    if (!this.updatedAt) {
      this.updatedAt = Date.now()
    }

    return next()
  } catch (error) {
    return next(error as Error)
  }
})

export const UserModel = mongoose.model<IUser>('User', UserSchema)
