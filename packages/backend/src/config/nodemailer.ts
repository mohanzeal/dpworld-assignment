import env from './env.js'
import nodemailer from 'nodemailer'

const { fromEmail, smtpUser, smtpUserPwd } = env.email

if (!fromEmail) {
  console.log("Missing required env's FROM_EMAIL_ADDRESS TO_EMAIL_ADDRESS")
  process.exit(1)
}

const mailConfig = {
  service: 'hotmail',
  auth: {
    user: smtpUser,
    pass: smtpUserPwd,
  },
}

const emailTransporter = nodemailer.createTransport(mailConfig as any)

export const nodemailerInstance = {
  emailTransporter,
  fromEmail,
}
