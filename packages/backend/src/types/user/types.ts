import { Types } from 'mongoose'
import { DisplayMode, UserRole, UserStatus } from './constants.js'

export type IUser = {
  _id: string | Types.ObjectId
  name: string
  featuredImage: string
  desc: string
  email: string
  password?: string
  currency: string
  locale: string
  displayMode: DisplayMode
  status: UserStatus
  role: UserRole
  isDeleted: boolean
  createdAt: Date | number
  updatedAt: Date | number
}

export type JwtPayload = IUser & {
  iat: number
  exp: number
}
