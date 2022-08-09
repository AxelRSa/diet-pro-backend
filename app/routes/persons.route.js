const express = require('express');
const router = express.Router()

const { checkAuth } = require("../middleware/auth")

const persons = require("../controllers/persons.controller")

// create
router.post("/", checkAuth, persons.createPerson)
router.post("/person-weight", checkAuth, persons.createPersonWeight)

// read
router.get("/all/:idUser", checkAuth, persons.getPersons)
// router.get("/:id", checkAuth, persons.getPerson)

// update
router.put("/person-weight", checkAuth, persons.updatePersonWeight)

// delete

module.exports = router
