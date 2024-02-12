import {
  CatchError,
  IUser,
  ModelType,
  USER_DISPLAY_COLUMNS,
} from '../types/index.js'
import lodash from 'lodash'
import { ApiError, BadRequestError } from './api-errors.js'

export const slugify = (input: string) => {
  if (!input) {
    return
  }

  // make lower case and trim
  let slug = input.toLowerCase().trim()

  // replace invalid chars with spaces
  slug = slug.replace(/[^a-z0-9\s-]/g, ' ')

  // replace multiple spaces or hyphens with a single hyphen
  slug = slug.replace(/[\s-]+/g, '-')

  return slug
}

export const unSlugify = (input: string) => {
  if (!input) {
    return
  }

  // make lower case and trim
  let title = input.toLowerCase().trim()

  // replace invalid chars with spaces
  title = title.replace(/[^a-z0-9\s-]/g, ' ')

  // replace multiple hyphens with a single space
  title = title.replace(/[\s-]+/g, ' ')

  return title
}

export const userAlreadyExistsError = (e: CatchError, res: any) => {
  if (e && e.code === 11000) {
    return ApiError.handle(new BadRequestError('User already exist!'), res)
  }
}

export const sendDefaultField = (type = ModelType.USER, payload: IUser) => {
  switch (type) {
    default:
      return lodash.pick(payload, USER_DISPLAY_COLUMNS)
  }
}

export const showOrOmitFields = (
  fields: string[],
  showOrOmit: 1 | 0 = 1,
  sendId = true
): Record<string, 1 | 0> => {
  const displayFields: Record<string, 1 | 0> = {}

  fields.forEach((field: string) => {
    displayFields[field] = showOrOmit
  })

  // id is the only field you can mix with inclusion and exclusion
  // otherwise Error: Projection does not allow exclusion inclusion together
  if (!sendId) {
    displayFields._id = 0
  }

  return displayFields
}

export function daysAgoFromToday(checkDay: Date): number {
  const today = new Date()
  const diff = checkDay.getTime() - today.getTime()
  const days = diff / 1000 / 60 / 60 / 24

  return Math.ceil(days)
}
