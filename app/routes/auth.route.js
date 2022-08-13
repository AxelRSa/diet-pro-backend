const express = require('express')
const router = express.Router()

const authController = require("../controllers/auth.controller")
const authValidation = require("../validations/auth.validation")

router.post("/login", authValidation.login, authController.login)
router.post("/signup", authValidation.signup, authController.signup)

module.exports = router
