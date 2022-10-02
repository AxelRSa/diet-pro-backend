import { CustomError } from './../helpers/generateErrors'
import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../helpers/generateToken'

/**
 * It checks if the token is valid and if it is, it allows the user to continue to the next middleware
 * @param req - Request - The request object
 * @param res - Response - This is the response object that will be sent back to the client.
 * @param next - This is a function that is called when the middleware is done.
 * @returns a function that is being used as a middleware.
 */
const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ').pop()

  /* Checking if the token is undefined, if it is, it throws an error. */
  if (token === undefined) { return next(new CustomError(400, 'The auth token was not send')) }

  /* Checking if the token is valid, if it is, it allows the user to continue to the next middleware. If
  it is not valid, it throws an error. */
  const tokenData = await verifyToken(token)
  if (!tokenData) { return next(new CustomError(401, 'The auth token is invalid, log in again')) }
  return next()
}

export default checkAuth