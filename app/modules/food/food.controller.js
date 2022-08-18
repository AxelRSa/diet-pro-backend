const { paginationStart, paginationEnd, howManyPagesAre } = require("../../helpers/paginationHelper")
const { generateFoodStructure } = require("../../helpers/handleArraysAndObjects")
const foodService = require("../../services/food.service")

// create
const createFood = async (req, res) => {
  try {
    const { idUser, name, protein, carbohydrates, fat } = req.body

    const foodsWithThatName = await foodService.getFoodsByIdUserAndName(idUser, name)
    if (foodsWithThatName.length >= 1) throw "That name exists, please, choose another one"

    await foodService.createFood(idUser, name, protein, carbohydrates, fat)

    res.json({ status: "success", message: `The food with name: ${name}, was created` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

// read
const getFoods = async (req, res) => {
  try {
    const { search, idUser, pagination } = req.query

    const ITEMS_PER_PAGINATION = 10
    const limitStart = paginationStart(pagination, ITEMS_PER_PAGINATION)
    const limitEnd = paginationEnd(pagination, ITEMS_PER_PAGINATION)
    let dbResponse = null
    let paginationResponse = null
    let howManyPaginationAre = null


    if (!search) {
      paginationResponse = await foodService.getFoodsCountByIdUser(idUser)
      howManyPaginationAre = howManyPagesAre(paginationResponse[0].count, ITEMS_PER_PAGINATION)
      dbResponse = await foodService.getFoodsByIdUserWithLimits(idUser, limitStart, limitEnd)
    } else {
      paginationResponse = await foodService.getFoodsCountByIdUserAndSearch(idUser)
      howManyPaginationAre = howManyPagesAre(paginationResponse[0].count, ITEMS_PER_PAGINATION)
      dbResponse = await foodService.getFoodsByIdUserAndSearchWithLimits(idUser, limitStart, limitEnd, search)
    }


    const data = {
      foods: generateFoodStructure(dbResponse),
      pagination: {
        current: parseInt(pagination),
        exist: howManyPaginationAre
      }
    }

    res.json({ status: "success", data })
  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

// update

// delete

module.exports = {
  createFood,
  getFoods
}
