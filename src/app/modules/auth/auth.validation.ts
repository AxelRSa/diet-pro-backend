import { check } from 'express-validator'
import { validateResult } from './../../helpers/validateHelper'

/** Validation for "auth/login" route */
export const login = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().isString().notEmpty(),
  validateResult
]

/** Validation for "auth/signup" route */
export const signup = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().isString().notEmpty(),
  check('username').exists().isString().notEmpty(),
  validateResult
]

