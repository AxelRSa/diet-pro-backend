const personsService = require("../../services/persons.service")

// create
const createPersonWeight = async (req, res) => {
  try {
    const { idPerson } = req.params
    const { weight, date } = req.body

    personsService.createPersonWeightByIdPerson(idPerson, weight, date)

    res.json({ status: "success", message: "Your information was received" })

  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// read


// update
const updatePersonWeight = async (req, res) => {
  try {
    const { idPerson } = req.params
    const { weight, date } = req.body

    await personsService.updatePersonWeightByIdPersonAndDate(idPerson, weight, date)

    res.json({ status: "success", message: "The weight was updated" })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

// delete

module.exports = {
  createPersonWeight,
  updatePersonWeight
}
