const express = require('express');
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./person.controller")
const validation = require("./person.validation")

router.post("/:idPerson/person-weight", checkAuth, validation.createPersonWeight, controller.createPersonWeight)

router.get("/:idPerson/person-weight", checkAuth, validation.getPersonWeights, controller.getPersonWeights)

router.put("/:idPerson", checkAuth, validation.updatePersonName, controller.updatePersonName)
router.put("/:idPerson/person-weight", checkAuth, validation.updatePersonWeight, controller.updatePersonWeight)

module.exports = router
