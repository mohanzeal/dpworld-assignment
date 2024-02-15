import Joi from 'joi'
import { UserFields, UserStatus } from '../../types/index.js'

export const register = Joi.object().keys({
  [UserFields.NAME]: Joi.string().min(2).max(256),
  [UserFields.EMAIL]: Joi.string().email().required(),
  [UserFields.PASSWORD]: Joi.string().min(6).required(),
  [UserFields.DESC]: Joi.string().allow('').optional(),
})

export const update = Joi.object().keys({
  [UserFields._ID]: Joi.string().required(),
  [UserFields.NAME]: Joi.string().min(2).max(256),
  [UserFields.DESC]: Joi.string().allow('').optional(),
  [UserFields.STATUS]: Joi.string()
    .valid(...Object.values(UserStatus))
    .optional(), // .valid('ACTIVE','IN_ACTIVE')
  [UserFields.IS_DELETED]: Joi.boolean().optional(),
})
