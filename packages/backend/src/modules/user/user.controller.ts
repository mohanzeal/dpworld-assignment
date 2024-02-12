import { CatchError, IUser, ModelType } from '../../types/index.js'
import { Request, Response } from 'express'
import lodash from 'lodash'
import { utils } from '../../utils/index.js'
import { userModule } from './index.js'

export const updateUser = async (req: Request, res: Response) => {
  const userDetails: IUser = req.body

  const { error } = userModule.validation.update.validate(userDetails, {
    abortEarly: false,
  })

  if (error) {
    console.log(error)
    return utils.ApiError.handle(new utils.BadRequestError(error?.message), res)
  }

  const filteredUserFields = lodash.omit(userDetails, ['_id', 'updatedAt'])
  try {
    const updatedUser = await userModule.model.UserModel.findByIdAndUpdate(
      userDetails._id,
      filteredUserFields,
      {
        new: true,
      }
    )

    if (!updatedUser) {
      return new utils.NotFoundResponse(
        res.__('api.user.updateUser.error')
      ).send(res)
    }

    return new utils.SuccessResponse(
      res.__('api.user.updateUser.success'),
      utils.sendDefaultField(ModelType.USER, updatedUser)
    ).send(res)
  } catch (e) {
    console.error(e)

    const catchError = e as CatchError
    let msg = res.__('api.common.error')
    if (catchError.name === 'CastError') {
      msg = 'Invalid User Id: ' + userDetails._id
    }

    return utils.ApiError.handle(new utils.BadRequestError(msg), res)
  }
}
