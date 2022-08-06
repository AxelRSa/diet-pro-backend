const { generateDashboardPersonStructure } = require("../helpers/utils")
const persons = require("../service/persons.service")

const createPerson = async (req, res) => {
  try {
    const { idUser, name } = req.body

    const personWithThatName = await persons.getPerson(idUser, name)
    if (personWithThatName.length >= 1) throw "That name exists, please, choose another one"

    await persons.createPerson(idUser, name)

    res.json({ status: "success", message: `The person ${name} was created` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

const createPersonWeight = async (req, res) => {
  try {
    const { idPerson, weight, date } = req.body

    await persons.createPersonWeightByIdPerson(idPerson, weight, date)

    res.json({ status: "success", message: "Your information was received" })

  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

const getPersons = async (req, res) => {
  try {
    const { idUser, fisrtDate, secondDate } = req.body

    const personsData = await persons.getPersonsWeightsByUserId(idUser, fisrtDate, secondDate)

    const arrayModified = generateDashboardPersonStructure(personsData)

    res.json({ status: "success", data: { persons: arrayModified } })

  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

const updatePersonWeight = async (req, res) => {
  try {
    const { idPerson, weight, date } = req.body

    await persons.updatePersonWeightByIdPersonAndDate(idPerson, weight, date)

    res.json({ status: "success", message: "The weight was updated" })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

module.exports = {
  createPerson,
  createPersonWeight,
  getPersons,
  updatePersonWeight
}
