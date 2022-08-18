const express = require('express');
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./food.controller")
const validation = require("./food.validation")

// create
router.post("/", checkAuth, validation.createFood, controller.createFood)
// router.post("/measure", checkAuth, validation.createFoodMeasure, controller.createFoodMeasure)

// read
router.get("/", checkAuth, validation.getFoods, controller.getFoods)
// router.get("/:idFood", checkAuth, validation.getFood, controller.getFood)

// update
// router.put("/:idFood", checkAuth, validation.updateFood, controller.updateFood)
// router.put("/measure/:idMeasure", checkAuth, validation.updateFood, controller.updateFood)

// delete
// router.delete("/:idMeasure", checkAuth, validation.deleteFoodMeasure, controller.deleteFoodMeasure)


module.exports = router
