const express = require('express');
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./meal.controller")
const validation = require("./meal.validation")

// create

// read

// update

// delete
router.delete("/:idMeal", checkAuth, validation.deleteMeal, controller.deleteMeal)

module.exports = router
