import * as controller from './user.controller.js'
import * as validation from './user.validation.js'
import * as model from './user.model.js'
import * as route from './user.route.js'

export const userModule = {
  controller,
  model,
  validation,
  route,
}
