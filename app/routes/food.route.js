const express = require('express');
const router = express.Router()

const { checkAuth } = require("../middleware/auth")

const controller = require("../controllers/food.controller")
const validation = require("../controllers/food.controller")

// create
router.post("/", checkAuth, validation.createFood, controller.createFood)

// read

// update

// delete

module.exports = router
