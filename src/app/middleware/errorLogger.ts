import { CustomError } from './../helpers/generateErrors'
import { Request, Response, NextFunction } from 'express'

/**
 * This show the errors, just for debug use. 
 * @param err - The error object.
 * @param _req - Request - The request object
 * @param _res - Response - The response object
 * @param next - The next function is a function in the Express router which, when
 * invoked, executes the middleware succeeding the current middleware.
 */
function logErrors (err: CustomError , _req: Request, _res: Response, next: NextFunction) {
  console.error({status:err.status, message:err.message})
  next(err)
}

export default logErrors