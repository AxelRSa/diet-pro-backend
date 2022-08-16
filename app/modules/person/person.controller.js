const { generateDashboardPersonStructure } = require("../../helpers/handleArraysAndObjects")
const personService = require("../../services/person.service")

// create
const createPerson = async (req, res) => {
  try {
    const { idUser, name } = req.body

    const personWithThatName = await personService.getPersonByIdUserAndName(idUser, name)
    if (personWithThatName.length >= 1) throw "That name exists, please, choose another one"

    await personService.createPerson(idUser, name)

    res.json({ status: "success", message: `The person ${name} was created` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

const createPersonWeight = async (req, res) => {
  try {
    const { idPerson, weight, date } = req.body

    await personService.createPersonWeightByIdPerson(idPerson, weight, date)

    res.json({ status: "success", message: "Your information was received" })

  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// read
const getPersonsWeights = async (req, res) => {
  try {
    const { firstDate, secondDate, idUser } = req.query

    const personsData = await personService.getPersonsWeightsByUserId(idUser, firstDate, secondDate)

    const arrayModified = generateDashboardPersonStructure(personsData)

    res.json({ status: "success", data: { persons: arrayModified } })

  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

const getPersonWeights = async (req, res) => {
  try {
    const { firstDate, secondDate, idPerson } = req.query

    const response = await personService.getPersonWeightsByIdPerson(idPerson, firstDate, secondDate)

    const personObject = {
      name: response[0].name,
      idPerson: response[0].id_person,
      chartData: {
        labels: response.map(register => register.date),
        data: response.map(register => register.weight)
      }
    }

    res.json({ status: "success", data: { person: personObject } })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// update
const updatePersonWeight = async (req, res) => {
  try {
    const { idPerson, weight, date } = req.body

    await personService.updatePersonWeightByIdPersonAndDate(idPerson, weight, date)

    res.json({ status: "success", message: "The weight was updated" })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

const updatePersonName = async (req, res) => {
  try {
    const { idUser, idPerson, name } = req.body

    const personWithThatName = await personService.getPersonByIdUserAndName(idUser, name)
    if (personWithThatName.length >= 1) throw "That name exists, please, choose another one"

    await personService.updatePersonNameByIdPerson(idPerson, name)

    res.json({ status: "success", message: `Now your the name is ${name}` })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// delete

module.exports = {
  createPerson,
  createPersonWeight,
  getPersonsWeights,
  getPersonWeights,
  updatePersonWeight,
  updatePersonName
}
