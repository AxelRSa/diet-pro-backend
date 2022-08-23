const { check } = require("express-validator")
const { validateResult } = require("../../helpers/validateHelper")

const createFoodMeasure = [
  check("idFood").exists().notEmpty().isNumeric(),
  check("name").exists().notEmpty().isString(),
  check("quantity").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResult(req, res, next)
]

module.exports = {
  createFoodMeasure
}
