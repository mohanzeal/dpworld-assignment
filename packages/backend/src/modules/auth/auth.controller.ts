import {
  AuthProvider,
  CatchError,
  IUser,
  JwtPayload,
  ModelType,
  UserFields,
} from '../../types/index.js'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import env from '../../config/env.js'
import { utils } from '../../utils/index.js'
import { authModule } from '../auth/index.js'
import { userModule } from './../user/index.js'
import passport from 'passport'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const { error } = authModule.validation.login.validate(
    { email, password },
    {
      abortEarly: false,
    }
  )

  if (error) {
    return new utils.BadRequestResponse(res.__('api.auth.login.required')).send(
      res
    )
  }

  try {
    const user: IUser | null = await userModule.model.UserModel.findOne({
      email,
    }).exec()

    if (user) {
      // check if user is active and has not been deactivated in the last 2 days

      const isValidPassword: boolean = bcrypt.compareSync(
        password,
        user.password as string
      )

      if (!isValidPassword) {
        return utils.ApiError.handle(
          new utils.AuthFailureError(res.__('api.auth.login.error')),
          res
        )
      }

      // go's through role middleware for verification of the user role.
      const jwtPayload: { user: Partial<JwtPayload> } = {
        user: {
          _id: user._id,
        },
      }

      const token: string = jwt.sign(jwtPayload, env.jwtSecret, {
        expiresIn: env.jwtExp,
      })

      return new utils.SuccessResponse(
        res.__('api.auth.login.success'),
        token
      ).send(res)
    }

    return utils.ApiError.handle(
      new utils.AuthFailureError(res.__('api.common.notHandled')),
      res
    )
  } catch (e) {
    console.log(e)
    return utils.ApiError.handle(
      new utils.BadRequestError(res.__('api.common.error')),
      res
    )
  }
}

export const register = async (req: Request, res: Response) => {
  const userDetails: IUser = req.body
  const { error } = userModule.validation.register.validate(userDetails, {
    abortEarly: false,
  })

  if (error) {
    return utils.ApiError.handle(new utils.BadRequestError(error?.message), res)
  }

  const hashedPassword = await bcrypt.hash(req.body.password, env.hashSalt)

  userDetails._id = new Types.ObjectId()
  userDetails.password = hashedPassword
  userDetails.createdAt = new Date()

  try {
    // const emailSent = (await sendRegisterationEmail(
    //   req,
    //   res,
    //   userDetails
    // )) as unknown as { accepted: [] }
    // if (emailSent?.accepted?.length > 0) {
    // }
    await userModule.model.UserModel.create(userDetails)
    return new utils.SuccessResponse(
      req.__('api.auth.register.success'),
      utils.sendDefaultField(ModelType.USER, userDetails)
    ).send(res)

    // return utils.ApiError.handle(
    //   new utils.BadRequestError(req.__('api.auth.register.error')),
    //   res
    // )
  } catch (e) {
    console.log(e)
    utils.userAlreadyExistsError(e as CatchError, res)

    return utils.ApiError.handle(
      new utils.BadRequestError(req.__('api.auth.register.error')),
      res
    )
  }
}

export const me = async (req: Request, res: Response) => {
  const id = (req.user as Partial<IUser>)._id

  if (!id || !Types.ObjectId.isValid(id)) {
    return new utils.BadRequestResponse('user id is not valid: ' + id).send(res)
  }

  try {
    const user = await userModule.model.UserModel.findById(id)

    if (!user) {
      return new utils.NotFoundResponse('User not found').send(res)
    }

    return new utils.SuccessResponse(
      'success',
      utils.sendDefaultField(ModelType.USER, user)
    ).send(res)
  } catch (e) {
    console.error(e)
    return utils.ApiError.handle(
      new utils.BadRequestError(res.__('api.common.error')),
      res
    )
  }
}

export const generateJWTPayload = (user: IUser) => {
  return {
    user: {
      [UserFields._ID]: user[UserFields._ID],
      [UserFields.NAME]: user[UserFields.NAME],
    },
  }
}

export const initiateGoogleOAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return passport.authenticate('google', {
    scope: ['email', 'profile'],
    accessType: 'offline',
    prompt: 'consent',
  })(req, res, next)
}

export const handleGoogleOAuthRedirect = (req: Request, res: Response) => {
  //sign a jwt token and login to frontend
  const jwtPayload: { user: Partial<JwtPayload> } = generateJWTPayload(
    req.user as IUser
  )

  const token: string = jwt.sign(jwtPayload, env.jwtSecret, {
    expiresIn: env.jwtExp,
  })

  return res.redirect(env.appDomain + `/#/login?cb=${token}`)
}

export const initiateLinkedinOAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return passport.authenticate(AuthProvider.LINKEDIN, {
    scope: ['openid', 'profile', 'email'],
    session: false,
  })(req, res, next)
}

export const handleLinkedinOAuthRedirect = (req: Request, res: Response) => {
  //sign a jwt token and login to frontend
  const jwtPayload: { user: Partial<JwtPayload> } = generateJWTPayload(
    req.user as IUser
  )

  const token: string = jwt.sign(jwtPayload, env.jwtSecret, {
    expiresIn: env.jwtExp,
  })

  return res.redirect(env.appDomain + `/#/login?cb=${token}`)
}
