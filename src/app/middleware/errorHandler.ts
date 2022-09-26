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
function errorHandler(err: CustomError, _req: Request, res: Response, _next: NextFunction) {
  return res
    .status(err.status)
    .json({ message: err.message })
}

export default errorHandler