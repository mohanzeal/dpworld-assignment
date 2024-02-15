import Joi from 'joi'

export const update = Joi.object().keys({
  userId: Joi.string().required(),
  path: Joi.string().allow('').optional(),
})
