const { check } = require("express-validator")
const { validateResult } = require("../helpers/validateHelper")

const login = [
  check("email")
    .exists()
    .notEmpty()
    .isEmail(),

  check("password")
    .exists()
    .notEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const signup = [
  check("email")
    .exists()
    .notEmpty()
    .isEmail(),

  check("password")
    .exists()
    .notEmpty(),

  check("username")
    .exists()
    .notEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {
  login,
  signup
}
