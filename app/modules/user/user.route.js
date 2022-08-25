const express = require('express')
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./user.controller")
const validation = require("./user.validation")

// create
router.post("/:idUser/person", checkAuth, validation.createPerson, controller.createPerson)
router.post("/:idUser/food", checkAuth, validation.createFood, controller.createFood)
router.post("/:idUser/meal", checkAuth, validation.createMeal, controller.createMeal)

// read
router.get("/:idUser/person-weight", checkAuth, validation.getPersonsWeights, controller.getPersonsWeights)
router.get("/:idUser/food", checkAuth, validation.getFoods, controller.getFoods)
router.get("/:idUser/person/:idPerson/person-weight", checkAuth, validation.getPersonWeights, controller.getPersonWeights)
router.get("/:idUser/food/:idFood", checkAuth, validation.getFood, controller.getFood)
router.get("/:idUser/meal", checkAuth, validation.getMeals, controller.getMeals)

// update
router.put("/:idUser/person/:idPerson", checkAuth, validation.updatePersonName, controller.updatePersonName)
router.put("/:idUser/food/:idFood", checkAuth, validation.updateFood, controller.updateFood)

// delete

module.exports = router
