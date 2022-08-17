const { check } = require("express-validator")
const { validateResult } = require("../../helpers/validateHelper")

const createFood = [
  check("idUser").exists().notEmpty(),
  check("name").exists().notEmpty().isString(),
  check("protein").exists().notEmpty().isNumeric(),
  check("carbohydrates").exists().notEmpty().isNumeric(),
  check("fat").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResult(req, res, next)
]

const getFood = [
  check("search").exists().isString(),
  check("idUser").exists().notEmpty().isNumeric(),
  check("pagination").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResult(req, res, next)
]

module.exports = {
  createFood,
  getFood
}
