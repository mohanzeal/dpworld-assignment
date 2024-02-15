import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  VerifiedCallback,
} from 'passport-jwt'
import env from '../env.js'
import { JwtPayload } from '../../types/index.js'

const opts = {} as StrategyOptions
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = env.jwtSecret

// extract payload from jwt token
export const JWTAuthentication = new Strategy(opts, function (
  jwt_payload: JwtPayload,
  done: VerifiedCallback
) {
  done(null, jwt_payload)
})
