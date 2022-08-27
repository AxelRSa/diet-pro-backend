const express = require('express')
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./users.controller")
const validation = require("./users.validation")

// create
router.post("/:idUser/persons", checkAuth, validation.createPerson, controller.createPerson)
router.post("/:idUser/foods", checkAuth, validation.createFood, controller.createFood)
router.post("/:idUser/meals", checkAuth, validation.createMeal, controller.createMeal)

// read
router.get("/:idUser/person-weights", checkAuth, validation.getPersonsWeights, controller.getPersonsWeights)
router.get("/:idUser/foods", checkAuth, validation.getFoods, controller.getFoods)
router.get("/:idUser/persons/:idPerson/person-weights", checkAuth, validation.getPersonWeights, controller.getPersonWeights)
router.get("/:idUser/foods/:idFood", checkAuth, validation.getFood, controller.getFood)
router.get("/:idUser/meals", checkAuth, validation.getMeals, controller.getMeals)

// update
router.put("/:idUser/persons/:idPerson", checkAuth, validation.updatePersonName, controller.updatePersonName)
router.put("/:idUser/foods/:idFood", checkAuth, validation.updateFood, controller.updateFood)

// delete

module.exports = router
