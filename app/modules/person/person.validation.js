const { check } = require("express-validator")
const { validateResult } = require("../../helpers/validateHelper")

const createPersonWeight = [
  check("idPerson").exists().notEmpty(),
  check("weight").exists().notEmpty().isNumeric(),
  check("date").exists().notEmpty().isDate(),
  (req, res, next) => validateResult(req, res, next)
]

const getPersonWeights = [
  check("firstDate").exists().notEmpty().isDate(),
  check("secondDate").exists().notEmpty().isDate(),
  check("idPerson").exists().notEmpty(),
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
  getPersonWeights,
  updatePersonWeight
}
