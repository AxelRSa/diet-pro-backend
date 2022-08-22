const { check } = require("express-validator")
const { validateResult } = require("../../helpers/validateHelper")

const createPersonWeight = [
  check("idPerson").exists().notEmpty(),
  check("weight").exists().notEmpty().isNumeric(),
  check("date").exists().notEmpty().isDate(),
  (req, res, next) => validateResult(req, res, next)
]

const updatePersonWeight = [
  check("idPerson").exists().notEmpty(),
  check("weight").exists().notEmpty().isNumeric(),
  check("date").exists().notEmpty().isDate(),
  (req, res, next) => validateResult(req, res, next)
]

module.exports = {
  createPersonWeight,
  updatePersonWeight
}
