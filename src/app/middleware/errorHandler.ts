import { CustomError } from './../helpers/generateErrors'
import { Request, Response, NextFunction } from 'express'

/**
 * General custom error handler
 * @param err - This is the error object that was thrown.
 * @param _req - Request - The request object
 * @param res - Response - The response object
 * @param _next - NextFunction - This is a function that you can call to pass control to
 * the next middleware function in the stack.
 * @returns return a response from the server
 */
function errorHandler(error: CustomError | Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof CustomError) {
    return res
      .status(error.status)
      .json({ message: error.message })
  } else {
    return res
      .status(500)
      .json({ message: 'Unexpected error, contact support' })
  }
}

export default errorHandler