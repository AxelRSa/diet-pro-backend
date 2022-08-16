const { check } = require("express-validator")
const { validateResult } = require("../../helpers/validateHelper")

const createPerson = [
  check("idUser")
    .exists()
    .notEmpty(),

  check("name")
    .exists()
    .notEmpty()
    .isString(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const createPersonWeight = [
  check("idPerson")
    .exists()
    .notEmpty(),

  check("weight")
    .exists()
    .notEmpty()
    .isNumeric(),

  check("date")
    .exists()
    .notEmpty()
    .isDate(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const getPersonsWeights = [
  check("firstDate")
    .exists()
    .notEmpty()
    .isDate(),

  check("secondDate")
    .exists()
    .notEmpty()
    .isDate(),

  check("idUser")
    .exists()
    .notEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const getPersonWeights = [
  check("firstDate")
    .exists()
    .notEmpty()
    .isDate(),

  check("secondDate")
    .exists()
    .notEmpty()
    .isDate(),

  check("idPerson")
    .exists()
    .notEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const updatePersonWeight = [
  check("idPerson")
    .exists()
    .notEmpty(),

  check("weight")
    .exists()
    .notEmpty()
    .isNumeric(),

  check("date")
    .exists()
    .notEmpty()
    .isDate(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const updatePersonName = [
  check("idPerson")
    .exists()
    .notEmpty(),

  check("idUser")
    .exists()
    .notEmpty(),

  check("name")
    .exists()
    .notEmpty()
    .isString(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {
  createPerson,
  createPersonWeight,
  getPersonsWeights,
  getPersonWeights,
  updatePersonWeight,
  updatePersonName
}
