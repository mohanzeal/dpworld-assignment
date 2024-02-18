import Joi from 'joi'

export const update = Joi.object().keys({
  userId: Joi.string().required(),
  action: Joi.string().allow('').optional(),
  entity: Joi.string().allow('').optional(),
})
