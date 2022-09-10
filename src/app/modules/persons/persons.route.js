const express = require('express');
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./persons.controller")
const validation = require("./persons.validation")

// create
router.post("/:idPerson/person-weights", checkAuth, validation.createPersonWeight, controller.createPersonWeight)

// read

// update
router.put("/:idPerson/person-weights", checkAuth, validation.updatePersonWeight, controller.updatePersonWeight)

// delete

module.exports = router
