const express = require('express');
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./foods.controller")
const validation = require("./foods.validation")

// create
router.post("/:idFood/measures", checkAuth, validation.createFoodMeasure, controller.createFoodMeasure)

// read

// update
router.put("/:idFood/measures/:idMeasure", checkAuth, validation.updateFoodMeasure, controller.updateFoodMeasure)

// delete
router.delete("/measures/:idMeasure", checkAuth, validation.deleteFoodMeasure, controller.deleteFoodMeasure)
router.delete("/:idFood", checkAuth, validation.deleteFood, controller.deleteFood)

module.exports = router
