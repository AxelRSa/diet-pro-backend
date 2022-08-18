const express = require('express');
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./food.controller")
const validation = require("./food.validation")

// create
router.post("/", checkAuth, validation.createFood, controller.createFood)

// read
router.get("/", checkAuth, validation.getFood, controller.getFood)
router.get("/:idFood", checkAuth, validation.getFood, controller.getFood)

// update

// delete

module.exports = router
