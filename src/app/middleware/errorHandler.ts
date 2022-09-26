import { CustomError } from './../helpers/generateErrors'
import { Request, Response, NextFunction } from 'express'

/**
 * General Error Handler if the error is an instance of CustomError, return a response with the status and message from the
 * error. Otherwise, return a response with a 500 status and a generic error message.
 * @param err - This is the error object that was thrown.
 * @param _req - Request - The request object
 * @param res - Response - The response object
 * @param _next - NextFunction - This is a function that you can call to pass control to
 * the next middleware function in the stack.
 * @returns return a response from the server
 */
function errorHandler(err: CustomError | Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({ message: err.message })
  }
  return res
    .status(500)
    .json({ error: 'Internal server error, contact support' })
}

export default errorHandler