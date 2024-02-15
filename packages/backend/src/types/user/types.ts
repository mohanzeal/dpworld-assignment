import { Types } from 'mongoose'
import { AuthProvider } from './constants.js'

export type IUser = {
  _id: string | Types.ObjectId
  name: string
  featuredImage: string
  authProvider: AuthProvider
  desc: string
  email: string
  password?: string
  isDeleted: boolean
  createdAt: Date | number
  updatedAt: Date | number
}

export type JwtPayload = IUser & {
  iat: number
  exp: number
}
