import { validateResult } from './../../helpers/validateHelper'
import { check } from 'express-validator'

/** Validation for login route */
export const login = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().isString().notEmpty(),
  validateResult
]

/** Validation for signup route */
export const signup = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().isString().notEmpty(),
  check('username').exists().isString().notEmpty(),
  validateResult
]

