const foodsService = require("../../services/foods.service")

// create
const createFoodMeasure = async (req, res) => {
  try {
    const { idFood } = req.params
    const { name, quantity } = req.body

    const foodMeasureWithThatName = await foodsService.getFoodMeasuresByIdFoodAndName(idFood, name)
    if (foodMeasureWithThatName.length >= 1) throw "That measure exists, please, choose another one"

    await foodsService.createFoodMeasure(idFood, name, quantity)

    res.json({ status: "success", message: `The measure ${name} was created` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}
// read

// update
const updateFoodMeasure = async (req, res) => {
  try {
    const { idFood, idMeasure } = req.params
    const { name, quantity } = req.body

    const foodMeasureWithThatName = await foodsService.getFoodMeasuresByIdFoodAndName(idFood, name)
    if (foodMeasureWithThatName.length >= 1 && foodMeasureWithThatName[0].measure_name !== name) throw "That measure exists, please, choose another one"

    await foodsService.updateFoodMeasureByIdMeasure(idMeasure, name, quantity)

    res.json({ status: "success", message: `The measure ${name} was updated` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}
// delete
const deleteFoodMeasure = async (req, res) => {
  try {
    const { idMeasure } = req.params

    await foodsService.deleteFoodMeasureByIdMeasure(idMeasure)

    res.json({ status: "success", message: `The measure was deleted` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

const deleteFood = async (req, res) => {
  try {
    const { idFood } = req.params

    // send error if the food is used in other meals, plans, days, etc...

    await foodsService.deleteFoodByIdFood(idFood)

    res.json({ status: "success", message: `The food was deleted` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

module.exports = {
  createFoodMeasure,
  updateFoodMeasure,
  deleteFoodMeasure,
  deleteFood
}
