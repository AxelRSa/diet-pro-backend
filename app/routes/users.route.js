const express = require('express')
const router = express.Router()

const { checkAuth } = require("../middleware/auth")

const user = require("../controllers/users.controller")

router.get("/", checkAuth, user.getUser)

module.exports = router
