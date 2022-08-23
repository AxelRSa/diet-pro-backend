const express = require('express');
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./food.controller")
const validation = require("./food.validation")

// create
router.post("/:idFood/measure", checkAuth, validation.createFoodMeasure, controller.createFoodMeasure)

// read

// update
// router.put("/:idFood", checkAuth, validation.updateFood, controller.updateFood)
// router.put("/measure/:idMeasure", checkAuth, validation.updateFoodMeasure, controller.updateFoodMeasure)

// delete
// router.delete("/measure/:idMeasure", checkAuth, validation.deleteFoodMeasure, controller.deleteFoodMeasure)

module.exports = router
