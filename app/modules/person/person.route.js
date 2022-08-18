const express = require('express');
const router = express.Router()

const { checkAuth } = require("../../middleware/auth")

const controller = require("./person.controller")
const validation = require("./person.validation")

// create
router.post("/", checkAuth, validation.createPerson, controller.createPerson)
router.post("/person-weight", checkAuth, validation.createPersonWeight, controller.createPersonWeight)

// read
router.get("/person-weight/all", checkAuth, validation.getPersonsWeights, controller.getPersonsWeights)
router.get("/person-weight", checkAuth, validation.getPersonWeights, controller.getPersonWeights)

// update
router.put("/person-weight", checkAuth, validation.updatePersonWeight, controller.updatePersonWeight)
router.put("/", checkAuth, validation.updatePersonName, controller.updatePersonName)

// delete

module.exports = router
