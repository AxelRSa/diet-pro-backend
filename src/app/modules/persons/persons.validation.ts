import { check } from 'express-validator'
import { validateResult } from './../../helpers/validateHelper'

/** Validation for POST "/:idPerson/person-weight" route */
export const createPersonWeight = [
  check('idPerson').exists().notEmpty().isNumeric(),
  check('weight').exists().notEmpty().isNumeric(),
  check('date').exists().notEmpty().isDate(),
  validateResult
]

/** Validation for PUT "/:idPerson/person-weight" route */
export const updatePersonWeight = [
  check('idPerson').exists().notEmpty().isNumeric(),
  check('weight').exists().notEmpty().isNumeric(),
  check('date').exists().notEmpty().isDate(),
  validateResult
]