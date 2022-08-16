const express = require('express')
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./user.controller")

router.get(
  "/",
  checkAuth,
  controller.getUser
)

module.exports = router
