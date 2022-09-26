import { CustomError } from './../helpers/generateErrors'
import { Request, Response, NextFunction } from 'express'

/**
 * This show the errors to know why the server stopped working or other thing, just for debug use. 
 * If the error is defined by the programmer it console logs as how it would be the response to the user, otherwise
 * use a default console log of the error to be examined
 * @param {CustomError | Error} err - The error object.
 * @param {Request} _req - Request - The request object
 * @param {Response} _res - Response - The response object
 * @param {NextFunction} next - The next function is a function in the Express router which, when
 * invoked, executes the middleware succeeding the current middleware.
 */
function logErrors (err: CustomError | Error, _req: Request, _res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
    console.error({status:err.status, message:err.message})
  } else {
    console.error(err)
  }
  next(err)
}

export default logErrors