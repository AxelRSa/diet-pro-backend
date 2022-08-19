const express = require('express');
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./food.controller")
const validation = require("./food.validation")

// router.get("/:idFood", checkAuth, validation.getFood, controller.getFood)
// router.put("/:idFood", checkAuth, validation.updateFood, controller.updateFood)

// router.post(":idFood/measure", checkAuth, validation.createFoodMeasure, controller.createFoodMeasure)
// router.put("/measure/:idMeasure", checkAuth, validation.updateFoodMeasure, controller.updateFoodMeasure)
// router.delete("/measure/:idMeasure", checkAuth, validation.deleteFoodMeasure, controller.deleteFoodMeasure)

module.exports = router
