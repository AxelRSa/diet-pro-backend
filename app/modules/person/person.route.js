const express = require('express');
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./person.controller")
const validation = require("./person.validation")

// create
router.post("/:idPerson/person-weight", checkAuth, validation.createPersonWeight, controller.createPersonWeight)

// read
router.get("/:idPerson/person-weight", checkAuth, validation.getPersonWeights, controller.getPersonWeights)

// update
router.put("/:idPerson/person-weight", checkAuth, validation.updatePersonWeight, controller.updatePersonWeight)

// delete

module.exports = router
