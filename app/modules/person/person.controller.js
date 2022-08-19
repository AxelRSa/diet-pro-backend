const personService = require("../../services/person.service")

// create
const createPersonWeight = async (req, res) => {
  try {
    const { idPerson } = req.params
    const { weight, date } = req.body

    personService.createPersonWeightByIdPerson(idPerson, weight, date)

    res.json({ status: "success", message: "Your information was received" })

  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// read
const getPersonWeights = async (req, res) => {
  try {
    const { idPerson } = req.params
    const { firstDate, secondDate } = req.query

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
    const { idPerson } = req.params
    const { weight, date } = req.body

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
  updatePersonWeight
}
