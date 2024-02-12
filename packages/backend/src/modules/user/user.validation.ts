import Joi from 'joi'
import {
  DisplayMode,
  UserFields,
  UserRole,
  UserStatus,
} from '../../types/index.js'

export const register = Joi.object().keys({
  [UserFields.NAME]: Joi.string().min(2).max(256),
  [UserFields.EMAIL]: Joi.string().email().required(),
  [UserFields.PASSWORD]: Joi.string().min(6).required(),
  [UserFields.CURRENCY]: Joi.string().allow('').optional(),
  [UserFields.LOCALE]: Joi.string().allow('').optional(),
  [UserFields.DESC]: Joi.string().allow('').optional(),
  [UserFields.STATUS]: Joi.string()
    .valid(...Object.values(UserStatus))
    .optional(), // .valid('ACTIVE','IN_ACTIVE')
  [UserFields.ROLE]: Joi.string()
    .valid(...Object.values(UserRole))
    .optional(), // .valid('SUPER_ADMIN','EDITOR')
  [UserFields.DISPLAY_MODE]: Joi.string()
    .valid(...Object.values(DisplayMode))
    .optional(),
})

export const update = Joi.object().keys({
  [UserFields._ID]: Joi.string().required(),
  [UserFields.NAME]: Joi.string().min(2).max(256),
  [UserFields.DESC]: Joi.string().allow('').optional(),
  [UserFields.CURRENCY]: Joi.string().allow('').optional(),
  [UserFields.LOCALE]: Joi.string().allow('').optional(),
  [UserFields.DISPLAY_MODE]: Joi.string().optional(),
  [UserFields.TRANSPORTATION_MODE]: Joi.string().allow('').optional(),
  [UserFields.STATUS]: Joi.string()
    .valid(...Object.values(UserStatus))
    .optional(), // .valid('ACTIVE','IN_ACTIVE')
  [UserFields.IS_DELETED]: Joi.boolean().optional(),
  [UserFields.ROLE]: Joi.string()
    .valid(...Object.values(UserRole))
    .optional(), // .valid('SUPER_ADMIN','EDITOR')
})
