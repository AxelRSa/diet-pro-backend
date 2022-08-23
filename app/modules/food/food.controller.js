const foodService = require("../../services/food.service")

// create
const createFoodMeasure = async (req, res) => {
  try {
    const { idFood } = req.params
    const { name, quantity } = req.body

    const foodWithThatName = await foodService.getFoodMeasuresByIdFoodAndName(idFood, name)
    if (foodWithThatName.length >= 1) throw "That measure exists, please, choose another one"

    await foodService.createFoodMeasure(idFood, name, quantity)

    res.json({ status: "success", message: `The measure ${name} was created` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}
// read

// update

// delete
const deleteFoodMeasure = async (req, res) => {
  try {
    const { idMeasure } = req.params

    await foodService.deleteFoodMeasureByIdMeasure(idMeasure)

    res.json({ status: "success", message: `The measure was deleted` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}
module.exports = {
  createFoodMeasure,
  deleteFoodMeasure
}
