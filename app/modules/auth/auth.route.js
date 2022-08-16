const express = require('express')
const router = express.Router()

const controller = require("./auth.controller")
const validation = require("./auth.validation")

router.post(
  "/login",
  validation.login,
  controller.login
)

router.post(
  "/signup",
  validation.signup,
  controller.signup
)

module.exports = router
