import type { Request, Response, NextFunction  } from 'express'
import { validationResult, Result } from 'express-validator'

/**
 * It takes the request, response, and next function as arguments, and then it tries to validate the
 * request using the validationResult function from express-validator. If the validation fails, it
 * throws an error, which is then caught and used to create a response object that is sent back to the
 * client.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object
 * @param {NextFunction} next - NextFunction - This is a function that will be called when the
 * middleware is done.
 * @returns nothing but the request continues
 */
export const validateResult = (req:Request, res:Response, next:NextFunction) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (e) {
    const error = e as Result

    const arrayErrors = error.array().map(singleError => `${singleError.msg}: '${singleError.value}'`)

    let message = ''

    arrayErrors.forEach((errorMessage, index) => {
      message += `${index +1}: ${errorMessage}. `
    })

    const response = {
      status:'error', 
      message 
    }

    res.status(403).json(response)
  }
}
