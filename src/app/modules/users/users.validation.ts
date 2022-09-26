import { check } from 'express-validator'
import { validateResult } from './../../helpers/validateHelper'

/* Create */
/** Validation for "users/:idUser/persons" route */
export const createPerson = [
  check('idUser').exists().isNumeric().notEmpty(),
  check('name').exists().notEmpty().isString(),
  validateResult
]

/** Validation for "users/:idUser/foods" route */
export const createFood = [
  check('idUser').exists().notEmpty(),
  check('name').exists().notEmpty().isString(),
  check('protein').exists().notEmpty().isNumeric(),
  check('carbohydrates').exists().notEmpty().isNumeric(),
  check('fat').exists().notEmpty().isNumeric(),
  validateResult
]

/** Validation for "users/:idUser/meals" route */
export const createMeal = [
  check('idUser').exists().notEmpty(),
  check('name').exists().notEmpty().isString(),
  check('measure').exists().notEmpty().isString(),
  check('foods').exists().isArray(),
  validateResult
]

/* Read */
/** Validation for "users/:idUser/person-weights" route */
export const getPersonsWeights = [
  check('firstDate').exists().notEmpty().isDate(),
  check('secondDate').exists().notEmpty().isDate(),
  check('idUser').exists().notEmpty(),
  validateResult
]

/** Validation for "users/:idUser/foods" route */
export const getFoods = [
  check('search').exists().isString(),
  check('idUser').exists().notEmpty().isNumeric(),
  check('pagination').exists().notEmpty().isNumeric(),
  validateResult
]

/** Validation for "users/:idUser/persons/:idPerson/person-weights" route */
export const getPersonWeights = [
  check('firstDate').exists().notEmpty().isDate(),
  check('secondDate').exists().notEmpty().isDate(),
  check('idPerson').exists().notEmpty().isNumeric(),
  validateResult
]

/** Validation for "users/:idUser/foods/:idFood" route */
export const getFood = [
  check('idFood').exists().notEmpty().isNumeric(),
  check('idUser').exists().notEmpty().isNumeric(),
  validateResult
]

/** Validation for "users/:idUser/meals" route */
export const getMeals = [
  check('idUser').exists().notEmpty().isNumeric(),
  check('search').exists().isString(),
  check('pagination').exists().notEmpty().isNumeric(),
  validateResult
]

/** Validation for "users/:idUser/meals/:idMeal" route */
export const getMeal = [
  check('idUser').exists().notEmpty().isNumeric(),
  check('idMeal').exists().notEmpty().isNumeric(),
  validateResult
]


/* Update */
/** Validation for "users/:idUser/persons/:idPerson" route */
export const updatePersonName = [
  check('idPerson').exists().notEmpty(),
  check('idUser').exists().notEmpty(),
  check('name').exists().notEmpty().isString(),
  validateResult
]

/** Validation for "users/:idUser/foods/:idFood" route */
export const updateFood = [
  check('idUser').exists().notEmpty().isNumeric(),
  check('idFood').exists().notEmpty().isNumeric(),
  check('name').exists().notEmpty().isString(),
  check('carbohydrates').exists().notEmpty().isNumeric(),
  check('protein').exists().notEmpty().isNumeric(),
  check('fat').exists().notEmpty().isNumeric(),
  validateResult
]

/** Validation for "users/:idUser/meals/:idMeal" route */
export const updateMeal = [
  check('idUser').exists().notEmpty().isNumeric(),
  check('idMeal').exists().notEmpty().isNumeric(),
  check('name').exists().notEmpty().isString(),
  check('measure').exists().notEmpty().isString(),
  check('foods').exists().isArray(),
  validateResult
]

/* Delete */