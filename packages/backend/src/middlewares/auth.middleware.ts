import { IUser } from '../types/index.js'
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { utils } from '../utils/index.js'

export const authByPassportJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return passport.authenticate(
    'jwt',
    {
      session: false,
    },
    async (error: Record<string, unknown>, payload: { user: IUser }) => {
      if (error || !payload) {
        new utils.AuthFailureResponse('Unauthorized Access').send(res)
      } else {
        // this is the payload extracted from the JWT
        // use this to verify the user status and role in the next middlewares
        req.user = payload.user
        next()
      }
    }
  )(req, res, next)
}
