import { validateResult } from './../../helpers/validateHelper'
import { check } from 'express-validator'

export const login = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().isString().notEmpty(),
  validateResult
]

export const signup = [
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().isString().notEmpty(),
  check('username').exists().isString().notEmpty(),
  validateResult
]

