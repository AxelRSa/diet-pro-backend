const foods = require("../service/food.service")

// create
const createFood = async (req, res) => {
  try {
    const { idUser, name, protein, carbohydrates, fat } = req.body

    const foodsWithThatName = await foods.getFoodsByIdUserAndName(idUser, name)
    if (foodsWithThatName.length >= 1) throw "That name exists, please, choose another one"

    await foods.createFood(idUser, name, protein, carbohydrates, fat)

    res.json({ status: "success", message: `The food with name: ${name}, was created` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

// read

// update

// delete

module.exports = {
  createFood
}
