import { NextFunction, Request, Response } from 'express'
import env from './env.js'

export const allowCros = (req: Request, res: Response, next: NextFunction) => {
  const allowedDomains = ['']
  const origin = req.headers.origin as string
  const allowedOrigins = allowedDomains.includes(origin) ? origin : ''

  res.setHeader('Access-Control-Allow-Origin', env.isDev ? '*' : allowedOrigins)
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')

  next()
}
