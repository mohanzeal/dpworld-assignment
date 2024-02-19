import passportLinkedin from 'passport-linkedin-oauth2'
import env from '../env.js'
import { userModule } from '../../modules/user/index.js'
import { Types } from 'mongoose'
import { UserFields, AuthProvider, IUser } from '../../types/index.js'

const LinkedinStrategy = passportLinkedin.Strategy

// middleware function
export const AuthenticationByLinkedin = new LinkedinStrategy(
  {
    clientID: env.oauth.linkedin.LINKEDIN_CLIENT_ID,
    clientSecret: env.oauth.linkedin.LINKEDIN_CLIENT_SECRET,
    callbackURL: env.oauth.linkedin.LINKEDIN_REDIRECT_CALLBACK_URL,
    scope: ['profile', 'email'],
    state: false,
  } as any,
  async (accessToken: string, refreshToken: string, profile: any, cb: any) => {
    const userPayload = {
      [UserFields.AUTH_PROVIDER]: AuthProvider.LINKEDIN,
    } as IUser

    if (profile._json) {
      userPayload[UserFields.NAME] = profile._json.given_name
      userPayload[UserFields.EMAIL] = profile._json.email
    }
    console.log(profile)

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
