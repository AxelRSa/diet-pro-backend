const { check } = require("express-validator")
const { validateResult } = require("../../helpers/validateHelper")

const createPerson = [
  check("idUser").exists().notEmpty(),
  check("name").exists().notEmpty().isString(),
  (req, res, next) => validateResult(req, res, next)
]

const createFood = [
  check("idUser").exists().notEmpty(),
  check("name").exists().notEmpty().isString(),
  check("protein").exists().notEmpty().isNumeric(),
  check("carbohydrates").exists().notEmpty().isNumeric(),
  check("fat").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResult(req, res, next)
]

const createMeal = [
  check("idUser").exists().notEmpty(),
  check("name").exists().notEmpty().isString(),
  check("measure").exists().notEmpty().isString(),
  check("foods").exists().isArray(),
  (req, res, next) => validateResult(req, res, next)
]

const getPersonsWeights = [
  check("firstDate").exists().notEmpty().isDate(),
  check("secondDate").exists().notEmpty().isDate(),
  check("idUser").exists().notEmpty(),
  (req, res, next) => validateResult(req, res, next)
]

const getFoods = [
  check("search").exists().isString(),
  check("idUser").exists().notEmpty().isNumeric(),
  check("pagination").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResult(req, res, next)
]

const getPersonWeights = [
  check("firstDate").exists().notEmpty().isDate(),
  check("secondDate").exists().notEmpty().isDate(),
  check("idPerson").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResult(req, res, next)
]

const getFood = [
  check("idFood").exists().notEmpty().isNumeric(),
  check("idUser").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResult(req, res, next)
]

const getMeals = [
  check("idUser").exists().notEmpty().isNumeric(),
  check("search").exists().isString(),
  check("pagination").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResult(req, res, next)
]

const getMeal = [
  check("idUser").exists().notEmpty().isNumeric(),
  check("idMeal").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResult(req, res, next)
]

const updatePersonName = [
  check("idPerson").exists().notEmpty(),
  check("idUser").exists().notEmpty(),
  check("name").exists().notEmpty().isString(),
  (req, res, next) => validateResult(req, res, next)
]

const updateFood = [
  check("idUser").exists().notEmpty().isNumeric(),
  check("idFood").exists().notEmpty().isNumeric(),
  check("name").exists().notEmpty().isString(),
  check("carbohydrates").exists().notEmpty().isNumeric(),
  check("protein").exists().notEmpty().isNumeric(),
  check("fat").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResult(req, res, next)
]

const updateMeal = [
  check("idUser").exists().notEmpty().isNumeric(),
  check("idMeal").exists().notEmpty().isNumeric(),
  check("name").exists().notEmpty().isString(),
  check("measure").exists().notEmpty().isString(),
  check("foods").exists().isArray(),
  (req, res, next) => validateResult(req, res, next)
]

module.exports = {
  createPerson,
  createFood,
  createMeal,
  getPersonsWeights,
  getFoods,
  getPersonWeights,
  getFood,
  getMeals,
  getMeal,
  updatePersonName,
  updateFood,
  updateMeal
}
