import passport from 'passport'
import { JWTAuthentication } from './passport-jwt.js'
import { AuthenticationByGoogle } from './passport-google.js'
import { AuthenticationByLinkedin } from './passport-linkedin.js'

passport.use(JWTAuthentication)
passport.use(AuthenticationByGoogle)
passport.use(AuthenticationByLinkedin)
