const express = require('express')
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./auth.controller")
const validation = require("./auth.validation")

router.post("/login", validation.login, controller.login)
router.post("/signup", validation.signup, controller.signup)
router.post("/user", checkAuth, controller.getUser)

module.exports = router
