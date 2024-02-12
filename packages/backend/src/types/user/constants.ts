import { IUser } from './types.js'

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'IN_ACTIVE',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  TRAVELER = 'TRAVELER',
  TRAVEL_AGENCY = 'TRAVEL_AGENCY',
}

export enum UserFields {
  _ID = '_id',
  NAME = 'name',
  USERNAME = 'username',
  FEATURED_IMAGE = 'featuredImage',
  PASSWORD = 'password',
  EMAIL = 'email',
  STATUS = 'status',
  IS_DELETED = 'isDeleted',
  CURRENCY = 'currency',
  TRANSPORTATION_MODE = 'transportationMode',
  DISTANCE_UNIT = 'distanceUnit',
  LOCALE = 'locale',
  DISPLAY_MODE = 'displayMode',
  ROLE = 'role',
  DESC = 'desc',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export const USER_DISPLAY_COLUMNS: Partial<keyof IUser>[] = [
  UserFields._ID,
  UserFields.NAME,
  UserFields.FEATURED_IMAGE,
  UserFields.EMAIL,
  UserFields.STATUS,
  UserFields.CURRENCY,
  UserFields.LOCALE,
  UserFields.DISPLAY_MODE,
  UserFields.IS_DELETED,
  UserFields.ROLE,
  UserFields.DESC,
  UserFields.CREATED_AT,
  UserFields.UPDATED_AT,
]

export enum DisplayMode {
  AUTO = 'auto',
  DARK = 'dark',
  LIGHT = 'light',
}

export const localeList = [
  { value: 'en-US', label: 'English' },
  { value: 'fr', label: 'French' },
]

export const displayModesList = [
  { value: DisplayMode.AUTO, label: 'Auto' },
  { value: DisplayMode.DARK, label: 'Dark' },
  { value: DisplayMode.LIGHT, label: 'Light' },
]
