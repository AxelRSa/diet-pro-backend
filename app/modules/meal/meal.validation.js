const { check } = require("express-validator")
const { validateResult } = require("../../helpers/validateHelper")

const deleteMeal = [
  check("idMeal").exists().notEmpty().isNumeric(),
  (req, res, next) => validateResult(req, res, next)
]

module.exports = {
  deleteMeal
}
