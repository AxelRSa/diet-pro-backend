const express = require('express')
const router = express.Router()

const user = require("../controllers/users.controller")

router.post("/login", user.doLogin)
router.post("/", user.registerNewUser)
router.post("/username", user.registerUsername)

module.exports = router
