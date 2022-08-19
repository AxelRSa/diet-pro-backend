const express = require('express')
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./user.controller")
const validation = require("./user.validation")

router.post("/:idUser/person", checkAuth, validation.createPerson, controller.createPerson)
router.post("/:idUser/food", checkAuth, validation.createFood, controller.createFood)

router.get("/:idUser/person-weight", checkAuth, validation.getPersonsWeights, controller.getPersonsWeights)
router.get("/:idUser/food", checkAuth, validation.getFoods, controller.getFoods)

module.exports = router
