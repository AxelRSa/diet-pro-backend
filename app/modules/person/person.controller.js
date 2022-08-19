const personService = require("../../services/person.service")

// create
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

const updatePersonWeight = async (req, res) => {
  try {
    const { idPerson, weight, date } = req.body

    await personService.updatePersonWeightByIdPersonAndDate(idPerson, weight, date)

    res.json({ status: "success", message: "The weight was updated" })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// delete

module.exports = {
  createPersonWeight,
  getPersonWeights,
  updatePersonWeight,
  updatePersonName
}
