const mealService = require("../../services/meal.service")

// create

// read

// update

// delete
const deleteMeal = async (req, res) => {
  try {
    const { idMeal } = req.params

    // send error if the meal is used in other meals, plans, days, etc...

    await mealService.deleteMealByIdMeal(idMeal)

    res.json({ status: "success", message: `The meal was deleted` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

module.exports = {
  deleteMeal
}
