const express = require('express')
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./user.controller")
const validation = require("./user.validation")

// create
router.post("/:idUser/person", checkAuth, validation.createPerson, controller.createPerson)
router.post("/:idUser/food", checkAuth, validation.createFood, controller.createFood)

// read
router.get("/:idUser/person-weight", checkAuth, validation.getPersonsWeights, controller.getPersonsWeights)
router.get("/:idUser/food", checkAuth, validation.getFoods, controller.getFoods)
router.get("/:idUser/person/:idPerson/person-weight", checkAuth, validation.getPersonWeights, controller.getPersonWeights)
router.get("/:idUser/food/:idFood", checkAuth, validation.getFood, controller.getFood)

// update
router.put("/:idUser/person/:idPerson", checkAuth, validation.updatePersonName, controller.updatePersonName)
router.put("/:idUser/food/:idFood", checkAuth, validation.updateFood, controller.updateFood)

// delete

module.exports = router
