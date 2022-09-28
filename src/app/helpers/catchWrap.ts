import { Request, Response, NextFunction } from 'express'

/**
 * HOF that takes a function that takes a request, response and returns a function that
 * takes a request, response, and next function, and executes the original
 * function, and if it throws an error, calls next with the error to call the error handler.
 * @param originalFunction - The function that you want to wrap.
 * @returns The function that is being returned is a function that takes in a request, response, and
 * next function.
 */
export const catchWrap = (originalFunction: (req:Request, res:Response) => void) => {
  return async (req:Request, res:Response, next:NextFunction) => {
    try {
      return await originalFunction(req, res)
    } catch (error) {
      next(error)
    }
  }
} 