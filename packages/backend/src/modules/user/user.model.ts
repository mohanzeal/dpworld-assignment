import {
  DisplayMode,
  IUser,
  UserFields,
  UserRole,
  UserStatus,
} from '../../types/index.js'
import mongoose, { Schema } from 'mongoose'

export const UserSchema = new Schema<IUser>(
  {
    [UserFields._ID]: { type: Schema.Types.ObjectId },
    [UserFields.NAME]: { type: String, required: true, default: '' },
    [UserFields.FEATURED_IMAGE]: { type: String, required: false, default: '' },
    [UserFields.EMAIL]: {
      type: String,
      unique: true,
      required: true,
      default: '',
    },
    [UserFields.PASSWORD]: { type: String, required: true, default: '' },
    [UserFields.CURRENCY]: { type: String, required: false, default: '' },
    [UserFields.DESC]: { type: String, required: false, default: '' },
    [UserFields.LOCALE]: { type: String, required: false, default: 'en-US' },
    [UserFields.DISPLAY_MODE]: {
      type: String,
      enum: DisplayMode,
      required: false,
      default: DisplayMode.LIGHT,
    },
    [UserFields.STATUS]: {
      type: String,
      enum: UserStatus,
      required: false,
      default: UserStatus.INACTIVE,
    },
    [UserFields.ROLE]: {
      type: String,
      enum: UserRole,
      required: true,
      default: UserRole.TRAVELER,
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
