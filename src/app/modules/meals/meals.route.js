const express = require('express');
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./meals.controller")
const validation = require("./meals.validation")

// create

// read

// update

// delete
router.delete("/:idMeal", checkAuth, validation.deleteMeal, controller.deleteMeal)

module.exports = router
