import passportGoogle from 'passport-google-oauth20'
import env from '../env.js'
import { userModule } from '../../modules/user/index.js'
import { Types } from 'mongoose'
import { AuthProvider, IUser, UserFields } from '../../types/index.js'

const GoogleStrategy = passportGoogle.Strategy

// middleware function
export const AuthenticationByGoogle = new GoogleStrategy(
  {
    clientID: env.oauth.google.GOOGLE_CLIENT_ID,
    clientSecret: env.oauth.google.GOOGLE_CLIENT_SECRET,
    callbackURL: env.oauth.google.GOOGLE_REDIRECT_CALLBACK_URL,
  },
  async (
    accessToken: string,
    refreshToken: string,
    params: any,
    profile: any,
    cb: any
  ) => {
    const userPayload = {
      [UserFields.AUTH_PROVIDER]: AuthProvider.GOOGLE,
    } as IUser

    if (profile._json) {
      userPayload[UserFields.NAME] = profile._json.given_name
      userPayload[UserFields.EMAIL] = profile._json.email
    }

    let user = await userModule.model.UserModel.findOne({
      [UserFields.EMAIL]: userPayload.email,
      // [UserFields.AUTH_PROVIDER]: AuthProvider.GOOGLE,
    })

    if (!user) {
      // create a user with all the details
      userPayload[UserFields._ID] = new Types.ObjectId()
      userPayload[UserFields.CREATED_AT] = new Date()

      // create user
      user = await userModule.model.UserModel.create(userPayload)
    }

    return cb(null, user)
  }
)
