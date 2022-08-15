const express = require('express')
const router = express.Router()

const { checkAuth } = require("../middleware/auth")

const controller = require("../controllers/user.controller")

router.get("/", checkAuth, controller.getUser)

module.exports = router
