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
function logErrors(error: CustomError | Error, _req: Request, _res: Response, next: NextFunction) {
  if (error instanceof CustomError) {
    console.error('Error sent to frontend')
    console.error({ status: error.status, message: error.message })
  } else {
    console.error('Unexpected error')
    console.error(error)
  }
  next(error)
}

export default logErrors