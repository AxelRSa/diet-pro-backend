const express = require('express');
const router = express.Router()

const { checkAuth } = require("../middleware/auth")

const food = require("../controllers/food.controller")

// create
router.post("/", checkAuth, food.createFood)

// read

// update

// delete

module.exports = router
