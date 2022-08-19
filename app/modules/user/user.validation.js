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

module.exports = {
  createPerson,
  createFood,
  getPersonsWeights,
  getFoods
}
