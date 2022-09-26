import type { Request, Response, NextFunction  } from 'express'
import { verifyToken } from '../helpers/generateToken'

/**
 * It checks if the token is valid and if it is, it allows the user to continue to the next middleware
 * @param req - Request - The request object
 * @param res - Response - This is the response object that will be sent back to the client.
 * @param next - This is a function that is called when the middleware is done.
 * @returns a function that is being used as a middleware.
 */
export const checkAuth = async (req:Request, res: Response, next:NextFunction) =>{
  try{
    const token = req.headers.authorization?.split(' ').pop()

    /* Checking if the token is undefined, if it is, it throws an error. */
    if (token === undefined) { throw new Error('The auth token was not send') }
    
    /* Checking if the token is valid, if it is, it allows the user to continue to the next middleware. If
    it is not valid, it throws an error. */
    const tokenData = await verifyToken(token)
    if (tokenData) return next()
    throw new Error('Your token is invalid')
  } catch(error){
    if (error instanceof Error) {
      return res.status(409).json({ status: 'error', message: error.message })
    }
  }
}

