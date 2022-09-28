import { check } from 'express-validator'
import { validateResult } from '../../helpers/validateHelper'

/* Create */

/** Validation for POST "food/:idFood/measures" route */
export const createFoodMeasure = [
  check('idFood').exists().notEmpty().isNumeric(),
  check('name').exists().notEmpty().isString(),
  check('quantity').exists().notEmpty().isNumeric(),
  validateResult
]

/* Read */

/* Update */

/** Validation for PUT "food/:idFood/measures/:idMeasure" route */
export const updateFoodMeasure = [
  check('idFood').exists().notEmpty().isNumeric(),
  check('idMeasure').exists().notEmpty().isNumeric(),
  check('name').exists().notEmpty().isString(),
  check('quantity').exists().notEmpty().isNumeric(),
  validateResult
]

/* Delete */
/** Validation for DELETE "food/measures/:idMeasure" route */
export const deleteFoodMeasure = [
  check('idMeasure').exists().notEmpty().isNumeric(),
  validateResult
]

/** Validation for DELETE "food/:idFood" route */
export const deleteFood = [
  check('idFood').exists().notEmpty().isNumeric(),
  validateResult
]